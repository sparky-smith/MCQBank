import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Space, Radio, Form, Input } from "antd";

function App() {
  const [quesnData, setQuesnData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadQuestion();
  }, []);

  async function loadQuestion() {
    const questions = await axios.get(process.env.REACT_APP_SERVER_URL);
    setQuesnData(questions.data);
    questions.data.forEach((q) => {
      answers.push(q.answer);
    });
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCreateQuenstion = () => {
    setIsModalOpen(true);
  };
  const onRadioChange = (e) => {
    userAnswers[e.target.name] = e.target.value;
  };
  const handleSubmit = () => {
    if(userAnswers.length !== answers.length){
      return window.alert("Please answer all!")
    }
    userAnswers.map((ans, index) => {
      let a = ans.trim(), b = answers[index].trim()
      if (a !== b) {
        document.getElementsByClassName("card")[index].style["border"] =
          "red solid 2px";
      }
      else{
        document.getElementsByClassName("card")[index].style["border"] =
          "green solid 2px";
      }
      document.getElementsByClassName("answers")[index].style["display"] =
          "block";
    });
  };
  const onFinish = async (values) => {
    let options = values.options.split(",");
    const body = {
      questionTitle: values.title,
      options: options,
      answer: values.answer,
    };
    const create = await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/createquestion`, body, {
        "content-Type": "application/json",
      })
      .then(
        (response) => {
        },
        (error) => {
          console.log(error);
        }
      );
    setIsModalOpen(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="container">
      <h2>Questions</h2>
      <div className="App">
        <Space direction="vertical">
          {quesnData.map((q, index) => (
            <div key={index} className="card">
              <h3>{q.questionTitle}</h3>
              <Radio.Group
                name={index}
                defaultValue={1}
                onChange={onRadioChange}
              >
                {q.options.map((opt, index) => (
                  <div key={index}>
                    <Radio value={opt}>{opt}</Radio>
                  </div>
                ))}
              </Radio.Group>
              <div className="answers" style={{ display: "none" }}>
                Answer: <strong>{answers[index]}</strong>
              </div>
            </div>
          ))}
        </Space>
      </div>
      <Button style={{ marginTop: "2rem" }} onClick={handleSubmit}>
        Submit
      </Button>
      <Button className="addBtn" onClick={handleCreateQuenstion}>
        Add Question
      </Button>
      <Modal
        title="Create Question"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        centered={true}
        footer={false}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Question Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input the question title!",
              },
            ]}
          >
            <Input placeholder="Please input the question title!" />
          </Form.Item>
          <Form.Item
            label="Options"
            name="options"
            rules={[
              {
                required: true,
                message: "Please input the question options with comma(,)!",
              },
            ]}
          >
            <Input placeholder="Please input the question options with comma(,)!" />
          </Form.Item>
          <Form.Item
            label="Answer"
            name="answer"
            rules={[
              {
                required: true,
                message: "Please input the answer!",
              },
            ]}
          >
            <Input placeholder="Please input the answer!" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
