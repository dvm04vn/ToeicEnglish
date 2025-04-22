import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

const LIST_SIDEBARS = () => [
  {
    title: 'Trang chủ',
    icon: "🏠",
    to: '/',
  },
  {
    title: 'Lộ trình',
    icon: "📚",
    to: '/learning-paths',
  },
  {
    title: 'Bài viết',
    icon: "📝",
    to: "/question", 
  }
];

function Sidebar({ topicId }) {
  const ListSidebar = LIST_SIDEBARS(topicId); // Gọi hàm với topicId

  return (
    <div className='sidebar-default'>
      <div className='sidebar-container'>
        {ListSidebar.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            end
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <span>{item.icon}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;