"use client"
import { createClient } from "@supabase/supabase-js";
import { Button, Form } from 'antd';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_ANON
  );
  useEffect(() => {
    
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        return router.push("/");
      }
      router.push("/login");
    };
    checkSession();
  })
  const logout = async () => {
    await supabase.auth.signOut()
  }
  const changePass = async (values) => {
    const { data } = await supabase.auth.getUser()
    const { error } = await supabase.auth.resetPasswordForEmail(
      dataUser.user.email,
      { redirectTo: `${process.env.BASE_URl}/change-pass` }
    )
    if (!error) {
      alert("Email đổi mật khẩu đã được gửi về mail của bạn!")

    }
  };
  return (
    <div style={{ width: "100wh", height: "100vh", display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "end", padding: "20px" }}>
        <Button type="primary" onClick={logout}>Đăng xuất</Button>
      </div>
      <div style={{ width: "100wh", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 800,
          }}
          onFinish={changePass}
          autoComplete="off"
        >
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Dashboard;