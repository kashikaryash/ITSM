import React, { useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
  FaTachometerAlt, 
  FaExclamationTriangle, 
  FaClipboardList, 
  FaUsers, 
  FaCog, 
  FaUserShield, 
  FaChartBar, 
  FaTicketAlt, 
  FaUserCog, 
  FaLayerGroup, 
  FaTools, 
  FaChevronDown, 
  FaChevronRight,
  FaFileImport,
  FaTags,
  FaExclamation,
  FaClock,
  FaBullseye,
  FaCheckCircle,
  FaList
} from 'react-icons/fa';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const { user, hasPermission } = useContext(AuthContext);
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isSubmenuActive = (submenuItems) => {
    return submenuItems.some(item => isActive(item.path));
  };

  // Menu items configuration based on permissions
  const menuItems = [
    {
      key: 'dashboard',
      title: 'Dashboard',
      icon: FaTachometerAlt,
      path: '/dashboard',
      permission: 'VIEW_DASHBOARD'
    },
    {
      key: 'incidents',
      title: 'Incidents',
      icon: FaExclamationTriangle,
      hasSubmenu: true,
      permission: 'VIEW_INCIDENTS',
      submenu: [
        {
          title: 'My Incidents',
          path: '/incidents/my',
          permission: 'VIEW_OWN_INCIDENTS'
        },
        {
          title: 'All Incidents',
          path: '/incidents',
          permission: 'VIEW_ALL_INCIDENTS'
        },
        {
          title: 'New Incident',
          path: '/incidents/new',
          permission: 'CREATE_INCIDENT'
        },
        {
          title: 'Incident Reports',
          path: '/incidents/reports',
          permission: 'VIEW_INCIDENT_REPORTS'
        }
      ]
    },
    {
      key: 'service-requests',
      title: 'Service Requests',
      icon: FaClipboardList,
      hasSubmenu: true,
      permission: 'VIEW_SERVICE_REQUESTS',
      submenu: [
        {
          title: 'Service Catalog',
          path: '/service-requests/catalog',
          permission: 'VIEW_SERVICE_CATALOG'
        },
        {
          title: 'My Requests',
          path: '/service-requests/my',
          permission: 'VIEW_OWN_REQUESTS'
        },
        {
          title: 'All Requests',
          path: '/service-requests',
          permission: 'VIEW_ALL_REQUESTS'
        },
        {
          title: 'Pending Approvals',
          path: '/service-requests/approvals',
          permission: 'APPROVE_REQUESTS'
        }
      ]
    },
    {
      key: 'admin',
      title: 'Administration',
      icon: FaUserShield,
      hasSubmenu: true,
      permission: 'ADMIN_ACCESS',
      submenu: [
        {
          title: 'User Management',
          path: '/admin/users',
          permission: 'MANAGE_USERS',
          icon: FaUsers
        },
        {
          title: 'Role Management',
          path: '/admin/roles',
          permission: 'MANAGE_ROLES',
          icon: FaUserCog
        },
        {
          title: 'Workgroups',
          path: '/admin/workgroups',
          permission: 'MANAGE_WORKGROUPS',
          icon: FaLayerGroup
        },
        {
          title: 'Import Users',
          path: '/admin/import-users',
          permission: 'IMPORT_USERS',
          icon: FaFileImport
        }
      ]
    },
    {
      key: 'configuration',
      title: 'Configuration',
      icon: FaCog,
      hasSubmenu: true,
      permission: 'SYSTEM_CONFIG',
      submenu: [
        {
          title: 'Status Management',
          path: '/config/status',
          permission: 'MANAGE_STATUS',
          icon: FaCheckCircle
        },
        {
          title: 'Priority Management',
          path: '/config/priority',
          permission: 'MANAGE_PRIORITY',
          icon: FaExclamation
        },
        {
          title: 'Impact Management',
          path: '/config/impact',
          permission: 'MANAGE_IMPACT',
          icon: FaBullseye
        },
        {
          title: 'Urgency Management',
          path: '/config/urgency',
          permission: 'MANAGE_URGENCY',
          icon: FaClock
        },
        {
          title: 'Category Management',
          path: '/config/category',
          permission: 'MANAGE_CATEGORY',
          icon: FaTags
        },
        {
          title: 'Resolution Codes',
          path: '/config/resolution',
          permission: 'MANAGE_RESOLUTION',
          icon: FaTools
        },
        {
          title: 'Service Catalog',
          path: '/config/service-catalog',
          permission: 'MANAGE_SERVICE_CATALOG',
          icon: FaList
        }
      ]
    },
    {
      key: 'reports',
      title: 'Reports',
      icon: FaChartBar,
      hasSubmenu: true,
      permission: 'VIEW_REPORTS',
      submenu: [
        {
          title: 'Incident Reports',
          path: '/reports/incidents',
          permission: 'VIEW_INCIDENT_REPORTS'
        },
        {
          title: 'Service Request Reports',
          path: '/reports/service-requests',
          permission: 'VIEW_SR_REPORTS'
        },
        {
          title: 'Performance Reports',
          path: '/reports/performance',
          permission: 'VIEW_PERFORMANCE_REPORTS'
        },
        {
          title: 'SLA Reports',
          path: '/reports/sla',
          permission: 'VIEW_SLA_REPORTS'
        }
      ]
    }
  ];

  const renderMenuItem = (item) => {
    // Check if user has permission for this menu item
    if (item.permission && !hasPermission(item.permission)) {
      return null;
    }

    const isExpanded = expandedMenus[item.key];
    const hasActiveSubmenu = item.hasSubmenu && isSubmenuActive(item.submenu);

    if (item.hasSubmenu) {
      return (
        <li key={item.key} className="nav-item">
          <div
            className={`nav-link d-flex align-items-center justify-content-between ${
              hasActiveSubmenu ? 'active' : ''
            }`}
            onClick={() => toggleSubmenu(item.key)}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex align-items-center">
              <item.icon className={`nav-icon ${isCollapsed ? 'me-0' : 'me-2'}`} />
              {!isCollapsed && <span>{item.title}</span>}
            </div>
            {!isCollapsed && (
              <span className="submenu-arrow">
                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            )}
          </div>
          
          {/* Submenu */}
          <div className={`submenu collapse ${isExpanded ? 'show' : ''}`}>
            <ul className="nav flex-column ms-3">
              {item.submenu
                .filter(subItem => !subItem.permission || hasPermission(subItem.permission))
                .map(subItem => (
                  <li key={subItem.path} className="nav-item">
                    <NavLink
                      to={subItem.path}
                      className={({ isActive }) => 
                        `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                      }
                    >
                      {subItem.icon && (
                        <subItem.icon className={`nav-icon ${isCollapsed ? 'me-0' : 'me-2'}`} />
                      )}
                      {!isCollapsed && <span>{subItem.title}</span>}
                    </NavLink>
                  </li>
                ))
              }
            </ul>
          </div>
        </li>
      );
    }

    return (
      <li key={item.key} className="nav-item">
        <NavLink
          to={item.path}
          className={({ isActive }) => 
            `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
          }
        >
          <item.icon className={`nav-icon ${isCollapsed ? 'me-0' : 'me-2'}`} />
          {!isCollapsed && <span>{item.title}</span>}
        </NavLink>
      </li>
    );
  };

  return (
    <div className={`sidebar bg-dark ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header p-3 border-bottom border-secondary">
        <div className="d-flex align-items-center justify-content-between">
          {!isCollapsed && (
            <div className="d-flex align-items-center">
              <FaTicketAlt className="text-primary me-2" size={24} />
              <h5 className="text-white mb-0">ITSM Portal</h5>
            </div>
          )}
          {isCollapsed && (
            <div className="d-flex justify-content-center w-100">
              <FaTicketAlt className="text-primary" size={24} />
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="user-info p-3 border-bottom border-secondary">
        <div className="d-flex align-items-center">
          <div className="user-avatar bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" 
               style={{ width: '32px', height: '32px', minWidth: '32px' }}>
            <span className="text-white fw-bold">
              {user?.firstName?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          {!isCollapsed && (
            <div className="user-details text-truncate">
              <div className="text-white fw-semibold text-truncate">
                {user?.firstName} {user?.lastName}
              </div>
              <small className="text-muted text-truncate d-block">
                {user?.email}
              </small>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav flex-grow-1">
        <ul className="nav flex-column p-2">
          {menuItems.map(renderMenuItem)}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer p-3 border-top border-secondary">
        <div className="d-flex align-items-center justify-content-between">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={toggleSidebar}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <FaChevronRight /> : <FaChevronDown />}
          </button>
          {!isCollapsed && (
            <small className="text-muted">
              Version 1.0.0
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;