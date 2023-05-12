import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio } from 'antd';
import { useState } from 'react';

const Questionnaire = () => {
    const [form] = Form.useForm();
    const [familyBreastCancer, setFamilyBreastCancer] = useState(false)
    const [secondBloodRelative, setSecondBloodRelative] = useState(false)

    return (
        <>
            {familyBreastCancer}
            <h1>女性乳腺癌筛查起始年龄推荐及发病年龄预测的在线计算小工具</h1>
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item label="1.年龄" name="age">
                    <Input placeholder="请输入年龄" />
                </Form.Item>
                <Form.Item label="2.是否有血缘亲属曾患乳腺癌？" name="familyBreastCancer">
                    <Radio.Group
                        onChange={(e) => setFamilyBreastCancer(e.target.value === 'true')}>
                        <Radio value="false">否</Radio>
                        <Radio value="true">是</Radio>
                    </Radio.Group>
                </Form.Item>

                {
                    familyBreastCancer &&
                    <>
                        <Form.Item label="2.1 她们是否是您的二级内血缘亲属（母亲、亲姐妹、祖母和外祖母、姑姨）？">
                            <Radio.Group
                                onChange={(e) => setSecondBloodRelative(e.target.value === 'true')}>
                                <Radio value="false">否</Radio>
                                <Radio value="true">是</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {secondBloodRelative &&
                            <Form.Item label="2.1.1 共有几人">
                                <Radio.Group>
                                    <Radio value="1">1个</Radio>
                                    <Radio value="2">大于等于2个</Radio>
                                </Radio.Group>
                            </Form.Item>
                        }
                    </>
                }
                <Form.Item label="3.您是否有一级血缘亲属（母亲、亲姐妹）在50岁及以前曾患乳腺癌？">
                    <Radio.Group>
                        <Radio value="false">否</Radio>
                        <Radio value="true">是</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <Button type="primary">计算</Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default Questionnaire;