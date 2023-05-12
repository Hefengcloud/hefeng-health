'use client'
import { Grid, Container, Button, Box } from '@mui/material';
import { Col, Row } from 'antd';
import Questionnaire from './questionnaire';

export default function Home() {
  return (
    <Row justify="center" style={{ height: '100vh' }}>
      <Col span={8}>
        <Questionnaire />
      </Col>
    </Row>
  )
}