import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, InputNumber, Radio, Modal } from 'antd';
import { useState } from 'react';

const Questionnaire = () => {
    const [form] = Form.useForm();
    const [familyBreastCancer, setFamilyBreastCancer] = useState(false)
    const [secondBloodRelative, setSecondBloodRelative] = useState(false)

    const [showResult, setShowResult] = useState(false)

    const [result, setResult] = useState('')

    const resultContents = [
        '您没有二级内乳腺癌家族史：如果建议普通人群50岁开始筛查，那么您可以考虑推迟1年筛查，在51岁开始乳腺癌筛查; 如果建议普通人群45岁开始筛查，那么您可以考虑推迟2年筛查，在47岁开始乳腺癌筛查。',
        '您有1个二级内血缘亲属乳腺癌家族史：如果建议普通人群50岁开始筛查，那么您应提前5年，在45岁开始乳腺癌筛查; 如果建议普通人群45岁开始筛查，那么您应提前3年，在42岁开始乳腺癌筛查。此外，乳腺癌平均发病年龄可能较普通人群发病提前5-6年。',
        '您有≥2个二级内血缘亲属乳腺癌家族史：如果建议普通人群50岁开始筛查，那么您应提前8年，在42岁开始乳腺癌筛查; 如果建议普通人群45岁开始筛查，那么您应提前4年，在41岁开始乳腺癌筛查，此外，乳腺癌平均发病年龄可能较普通人群发病提前3-4年。',
        '您有一级血缘亲属在50岁及以前曾患乳腺癌：如果建议普通人群50岁开始筛查，那么您应提前7年，在43岁开始乳腺癌筛查; 如果建议普通人群45岁开始筛查，那么您应提前3年，在42岁开始乳腺癌筛查。此外，乳腺癌平均发病年龄可能较普通人群发病提前6-7年。',
        '您有≥2个二级内血缘亲属乳腺癌家族史且存在一级血缘亲属在50岁及以前曾患乳腺癌：如果建议普通人群50岁开始筛查，那么您应提前8年，在42岁开始乳腺癌筛查; 如果建议普通人群45岁开始筛查，那么您应提前4年，在41岁开始乳腺癌筛查。此外，乳腺癌平均发病年龄可能较普通人群发病提前6-7年。',
    ]

    const onFinish = (values) => {
        console.log('Succes:', values)

        // const c1 = values.familyBreastCancer === 'false' || values.secondBloodRelative === 'false'
        const c2 = values.familyBreastCancer === 'true' && values.secondBloodRelative === 'true' && values.peopleNumber === '1'
        const c3 = values.familyBreastCancer === 'true' && values.secondBloodRelative === 'true' && values.peopleNumber === '2'
        const c4 = values.firstBloodRelative === 'true'

        if (c2) {
            setResult(c4 ? resultContents[3] : resultContents[1])
        } else if (c3) {
            setResult(c4 ? resultContents[4] : resultContents[2])
        } else {
            setResult(resultContents[0])
        }

        setShowResult(true)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <>
            <h2>基于乳腺癌家族史因素的</h2>
            <h1>女性乳腺癌筛查起始年龄推荐及发病年龄预测的在线计算小工具</h1>
            <Divider />
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item label="1.年龄" name="age"
                    rules={[{ required: true, message: '请输入年龄' }]}
                >
                    <InputNumber placeholder="请输入年龄" min={18} max={100} />
                </Form.Item>
                <Form.Item label="2.是否有血缘亲属曾患乳腺癌？"
                    name="familyBreastCancer"
                    rules={[{ required: true, message: '请选择' }]}
                >
                    <Radio.Group
                        onChange={(e) => setFamilyBreastCancer(e.target.value === 'true')}>
                        <Radio value="false">否</Radio>
                        <Radio value="true">是</Radio>
                    </Radio.Group>
                </Form.Item>

                {
                    familyBreastCancer &&
                    <>
                        <Form.Item label="2.1 她们是否是您的二级内血缘亲属（母亲、亲姐妹、祖母和外祖母、姑姨）？"
                            name="secondBloodRelative"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Radio.Group
                                onChange={(e) => setSecondBloodRelative(e.target.value === 'true')}>
                                <Radio value="false">否</Radio>
                                <Radio value="true">是</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {secondBloodRelative &&
                            <Form.Item label="2.1.1 共有几人" name="peopleNumber"
                                rules={[{ required: true, message: '请选择' }]}
                            >
                                <Radio.Group>
                                    <Radio value="1">1个</Radio>
                                    <Radio value="2">大于等于2个</Radio>
                                </Radio.Group>
                            </Form.Item>
                        }
                        <Form.Item label="2.2 您是否有一级血缘亲属（母亲、亲姐妹）在50岁及以前曾患乳腺癌？"
                            name="firstBloodRelative"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Radio.Group>
                                <Radio value="false">否</Radio>
                                <Radio value="true">是</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </>
                }
                <Form.Item>
                    <Button type="primary" htmlType="submit">计算</Button>
                </Form.Item>

            </Form>

            <Modal title="计算结果" open={showResult} onCancel={() => setShowResult(false)}
                footer={[
                    <Button key="back" onClick={() => setShowResult(false)}>知道了</Button>,
                ]}
            >
                {result}
            </Modal>
        </>
    );
};
export default Questionnaire;