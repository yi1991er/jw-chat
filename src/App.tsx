import "./styles.css";
import React, { useState } from "react";
import { Chat, ContactList } from "react-jwchat";
import { contact, contactList, messageList, my } from "./displayData";
import {
  ConfigProvider,
  Button,
  Row,
  Col,
  Typography,
  Collapse,
  Modal
} from "antd";
import { SettingOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
export default function App() {
  const [chatListData, setChatListData] = useState<any[]>(messageList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [SelectContact, setContact] = useState<{}>(contact);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{}>({
    ai_answer: "",
    key_points: "",
    topnotch_playe: []
  });
  const fetchData = () => {
    setLoading(true);
    // fetch("https://randomuser.me/api")
    fetch("/key_points", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        msg: ["YCL等级考试的含金量怎么样？"]
      })
    })
      .then((res) => res.json())
      .then(({ results }) => {
        console.log(results, data);
        setLoading(false);
        // setData(results[0]);
        setData({
          ai_answer:
            "① 这个YCL考级呢，是一个权威性更高含金量更高的考级，是由工信部主导，电子教育学会参与的双部门考级，考试证书也是加盖两个部门公章，还会录入工信部人才库，为孩子提供能力凭证。\n②所以咱们核桃前年呢，一直申请参与，到下半年终于申请下来了，这对咱们核桃学员来说是一件好事，咱们有更适配的考级体系了。\n③ 因为这个YCL呢，他的考试大纲是跟咱们核桃课程体系完美契合的，咱们学的知识点，就是人家考试的考点。所以现在呢，他已经是咱们核桃家长，最看重的这个考级，也能很好反应孩子在核桃的学习水平。\n④恩，还是很不错的考级，这次寒假报名他不是开启了嘛，咱们可以去考一考，检验一下今年的学习成果，我觉得都挺好的。",
          key_points:
            "不能只说证书含金量等基础信息回答家长，要加入其他点，表达出YCL对核桃学员的好处，还有YCL本身难申请，最后提出推荐孩子去检验一下自身考一考。",
          topnotch_playe: [
            {
              id: 1,
              avatar: "//game.gtimg.cn/images/lol/act/img/champion/Fizz.png",
              nickname: "菲兹",
              message: "你抓不到我！"
            }
          ]
        });
      });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <ConfigProvider>
      <Row
        style={{
          height: "100%"
        }}
      >
        <Col
          span={16}
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative"
          }}
        >
          <Modal
            title="会话设置"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
          <Row
            justify="center"
            style={{
              backgroundColor: "#bae0ff",
              paddingTop: 19
            }}
          >
            <Title>教师界面</Title>
          </Row>
          <Row
            style={{
              padding: 10,
              flexGrow: 1,
              background: "#e6f4ff",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <ContactList
              data={contactList}
              onSelect={(a) => {
                // console.log(a);
                setContact(a);
                setData({
                  ai_answer: "",
                  key_points: "",
                  topnotch_playe: []
                });
              }}
              style={{
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                overflow: "hidden",
                // width: 220,
                height: 800
              }}
            />
            <Chat
              contact={SelectContact}
              me={my}
              chatList={chatListData.filter(
                (i) =>
                  (i.user.id == SelectContact.id && i.contact.id == my.id) ||
                  (i.user.id == my.id && i.contact.id == SelectContact.id)
              )}
              onSend={(msg: any) =>
                setChatListData([
                  ...chatListData,
                  { ...msg, contact: SelectContact }
                ])
              }
              onEarlier={() => console.log("EarlierEarlier")}
              style={{
                flexGrow: 1,
                height: 800
              }}
            />
            <div
              style={{
                width: 300,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                backgroundColor: "white",
                border: "1px solid #f1f1f1",
                height: 800,
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Row
                style={{
                  padding: 5
                }}
              >
                <Button
                  type="ghost"
                  icon={<SettingOutlined />}
                  onClick={showModal}
                />
                <div
                  style={{
                    flexGrow: 1
                  }}
                >
                  <Button
                    type="primary"
                    block
                    ghost
                    loading={loading}
                    onClick={(e) => {
                      e.preventDefault();
                      let curr_chatListData = chatListData.filter(
                        (i) =>
                          (i.user.id == SelectContact.id &&
                            i.contact.id == my.id) ||
                          (i.user.id == my.id &&
                            i.contact.id == SelectContact.id)
                      );
                      console.log("curr_chatListData", curr_chatListData);
                      fetchData();
                    }}
                  >
                    获取话术
                  </Button>
                </div>
              </Row>
              <Row
                style={{
                  padding: 5,
                  flexGrow: 1
                }}
              >
                <Collapse
                  accordion
                  defaultActiveKey={1}
                  style={{
                    width: "100%"
                  }}
                >
                  <Panel header="AI 话术" key="1">
                    {data.ai_answer ? data.ai_answer : "请点击按钮"}
                  </Panel>
                  <Panel header="话术思路" key="2">
                    {data.key_points ? data.key_points : "请点击按钮"}
                  </Panel>
                  <Panel header="优秀案例" key="3">
                    <p>{text}</p>
                  </Panel>
                </Collapse>
              </Row>
            </div>
          </Row>
        </Col>
        <Col
          span={8}
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative"
          }}
        >
          <Row
            justify="center"
            style={{
              backgroundColor: "#d9f7be",
              paddingTop: 19
            }}
          >
            <Title>家长界面</Title>
          </Row>
          <Row
            style={{
              padding: 10,
              background: "#f6ffed",
              flexGrow: 1,
              position: "relative",
              overflow: "hidden"
            }}
          >
            <Chat
              contact={my}
              me={SelectContact}
              chatList={chatListData.filter(
                (i) =>
                  (i.user.id == SelectContact.id && i.contact.id == my.id) ||
                  (i.user.id == my.id && i.contact.id == SelectContact.id)
              )}
              onSend={(msg: any) =>
                setChatListData([...chatListData, { ...msg, contact: my }])
              }
              onEarlier={() => console.log("EarlierEarlier")}
              style={{
                width: 600,
                height: 800,
                borderRadius: 5
              }}
            />
          </Row>
        </Col>
      </Row>
    </ConfigProvider>
  );
}
