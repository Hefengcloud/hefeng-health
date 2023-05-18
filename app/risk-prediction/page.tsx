'use client'

import { Alert, Breadcrumb, Button, Divider, Form, InputNumber, Layout, Modal, Radio, theme } from 'antd';
const { Header, Content, Footer } = Layout;
import { useState } from 'react';
import { resolveModuleName } from 'typescript';

const educationLevelValues = [0, 0.29, 0.69878]
const menopauseValue = 0.29448

interface RiskResult {
    message: string,
    description: string,
    type: string
}

const riskLevelMessages: RiskResult[] = [
    {
        message: '乳腺癌低风险',
        description: '请继续保持健康生活方式',
        type: 'success'
    },
    {
        message: '乳腺癌中风险',
        description: '请继续保持健康生活方式，建议参加乳腺癌筛查项目',
        type: 'warning'
    },
    {
        message: '乳腺癌高风险',
        description: '我们强烈建议参加乳腺癌筛查项目或前往医院进行进一步评估',
        type: 'error'
    }
]

export default function Page() {
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    const [form] = Form.useForm()
    const [isMenopaused, setIsMenopaused] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [result, setResult] = useState<RiskResult>()

    const onFinish = (values: any) => {
        console.log(values)

        const age = values.age
        const educationLevel = +values.educationLevel
        const menopauseAge = values.menopauseAge ? +values.menopauseAge : 0
        const diseaseHistory = values.diseaseHistory === '1'
        const surgeryHistory = values.surgeryHistory === '1'

        const rs = calculate(age, educationLevel, menopauseAge, diseaseHistory, surgeryHistory)

        let riskLevel = 0
        if (rs < 0.4) {
            riskLevel = 0
        } else if (rs < 0.7) {
            riskLevel = 1
        } else {
            riskLevel = 2
        }

        setResult(riskLevelMessages[riskLevel])
        setShowResult(true)
    }

    const onFinishFailed = (errorInfo: any) => {

    }

    const calculate = (age: number,
        educationLevel: number,
        menopauseAge: number,
        diseaseHistory: boolean, surgeryHistory: boolean) => {
        console.log(`age = ${age}\n`)
        console.log(`education level = ${educationLevel}\n`)
        console.log(`menopause age = ${menopauseAge}\n`)
        console.log(`disease history = ${diseaseHistory}\n`)
        console.log(`surgery history = ${surgeryHistory}\n`)
        let rs: number = 0
        if (age >= 50 && age <= 59) {
            rs += 0.09973
        } else if (age >= 60 && age <= 69) {
            rs += 0.12198
        } else if (age >= 70 && age <= 74) {
            rs += 0.58906
        }

        rs += educationLevelValues[educationLevel]
        if (menopauseAge >= 50) {
            rs += 0.29448
        }

        if (diseaseHistory) {
            rs += 0.34751
        }

        if (surgeryHistory) {
            rs += 0.24507
        }

        console.log(`RS = ${rs}`)
        return rs
    }


    return (
        <Layout className="layout">
            <Content
                style={{
                    padding: '40px 50px',
                }}
            >
                <h1>乳腺癌风险预测模型</h1>
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>乳腺癌</Breadcrumb.Item>
                    <Breadcrumb.Item>风险预测</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item label="1 年龄(age)" name="age"
                            rules={[{ required: true, message: '请输入年龄' }]}
                        >
                            <InputNumber placeholder="请输入年龄" min={18} max={100} />
                        </Form.Item>
                        <Form.Item label="2 最高教育程度(education level)？"
                            name="educationLevel"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Radio.Group>
                                <Radio value="0">小学及以下</Radio>
                                <Radio value="1">初中及高中</Radio>
                                <Radio value="2">大专及以上</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="3 是否绝经(menopause)？"
                            name="menopause"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Radio.Group
                                onChange={(e) => setIsMenopaused(e.target.value === '1')}
                            >
                                <Radio value="0">否</Radio>
                                <Radio value="1">是</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {
                            isMenopaused && <Form.Item label="3.1 绝经年龄(age at menopause)"
                                name="menopauseAge"
                                rules={[{ required: true, message: '请输入年龄' }]}
                            >
                                <InputNumber placeholder="请输入年龄" min={18} max={100} />
                            </Form.Item>
                        }

                        <Form.Item label="4 乳腺良性疾病史（乳腺增生、结节、导管扩张、良性纤维腺瘤等）(history of benign breast disease)"
                            name="diseaseHistory"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Radio.Group>
                                <Radio value="0">否</Radio>
                                <Radio value="1">是</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="5.乳腺生殖系统手术史（子宫、卵巢和输卵管等部位的手术，包括剖腹产）(history of reproductive system surgery)"
                            name="surgeryHistory"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Radio.Group>
                                <Radio value="0">否</Radio>
                                <Radio value="1">是</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">计算</Button>
                            <Button style={{ marginLeft: '10px' }} htmlType="reset">重置</Button>
                        </Form.Item>
                    </Form>

                    <Modal title="预测结果" centered open={showResult} onCancel={() => setShowResult(false)}
                        footer={[
                            <Button key="back" onClick={() => setShowResult(false)}>知道了</Button>,
                        ]}
                    >
                        <Alert
                            message={result?.message}
                            description={result?.description}
                            type={result?.type || 'info'}
                            showIcon />
                    </Modal>
                </div>
            </Content>
        </Layout>
    )
}