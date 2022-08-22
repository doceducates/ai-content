import React from 'react'
import { Component } from 'react'
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap'


const { Configuration, OpenAIApi } = require('openai')

class BlogIdeas extends Component {
    constructor() {
        super()
        this.state = {
            heading: `AI Generated Response:`,
            response: `List of blog post ideas generated by the AI will show here.`
        }
    }
    
    onFormSubmit = e => {

        e.preventDefault()

        const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())


        // OpenAI davinci completion
        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        openai.createCompletion("text-davinci-002", {
            prompt: `Brainstorm blog post ideas for ${formDataObj.topic}:\n\n `,
            temperature: 0.6,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 1,
            presence_penalty: 1,
        })
        .then((response) => {
            this.setState({
                heading: `Brainstorm some blog post ideas for: ${formDataObj.topic}`,
                response: `${response.data.choices[0].text}`
            })
        }); 
    }
  
    render () {
        return (
        <div id="main-content">
        <Container>
        <Row>
        <Col xs={6} md={4}>
        <h1>Blog Post Ideas</h1>
        <p id="pageDescription">Enter your your content topic to generate a list of blog post ideas. </p>
        

        <Form onSubmit={this.onFormSubmit}>
        <Form.Group className="mb-3" controlId="textArea">
            <Form.Label>Topic:</Form.Label>
            <Form.Control as="textarea" name="topic" placeholder="e.g. Finance" />
        </Form.Group>
        <Button variant="primary" size="md" type="submit">Submit</Button>
        </Form>
        </Col>

        <Col xs={12} md={8}>
        <Card className="text-center">
        <Card.Header><h2>{this.state.heading}</h2></Card.Header>
        <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
            <p className="pre-wrap">{this.state.response}</p>
            </Card.Text>
        </Card.Body>
        </Card>
        </Col>
        </Row>
        </Container>
        </div>
        );
    }
}

export default BlogIdeas;