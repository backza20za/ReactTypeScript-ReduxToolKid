import * as React from "react";
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
type MenuComponentProps = {
  //
};

const { Sider } = Layout;

const items2: MenuProps['items'] = [UserOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `TodoList`,

      children: new Array(1).fill(null).map((_, j) => {
        const subKey = index * 2 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);
const MenuComponent: React.FC<any> = () => {
  return (
    <>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          items={items2}
        />
      </Sider>
    </>);
};

export default MenuComponent;
