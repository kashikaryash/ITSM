// hooks/usePermissions.js
import { useMemo } from 'react';
import { useAuth } from './useAuth';

export const usePermissions = () => {
  const { user } = useAuth();

  const permissions = useMemo(() => {
    if (!user) return [];
    return user.permissions || [];
  }, [user]);

  const roles = useMemo(() => {
    if (!user) return [];
    return user.roles || [];
  }, [user]);

  const hasPermission = (permission) => {
    if (!user) return false;
    return permissions.includes(permission);
  };

  const hasRole = (role) => {
    if (!user) return false;
    return roles.includes(role);
  };

  const hasAnyPermission = (permissionList) => {
    if (!user || !Array.isArray(permissionList)) return false;
    return permissionList.some(permission => permissions.includes(permission));
  };

  const hasAllPermissions = (permissionList) => {
    if (!user || !Array.isArray(permissionList)) return false;
    return permissionList.every(permission => permissions.includes(permission));
  };

  const hasAnyRole = (roleList) => {
    if (!user || !Array.isArray(roleList)) return false;
    return roleList.some(role => roles.includes(role));
  };

  const hasAllRoles = (roleList) => {
    if (!user || !Array.isArray(roleList)) return false;
    return roleList.every(role => roles.includes(role));
  };

  const canAccess = (resource, action = 'read') => {
    if (!user) return false;
    
    // Check specific permission
    const specificPermission = `${resource}:${action}`;
    if (permissions.includes(specificPermission)) return true;
    
    // Check wildcard permissions
    const wildcardPermission = `${resource}:*`;
    if (permissions.includes(wildcardPermission)) return true;
    
    // Check admin role
    if (roles.includes('admin') || roles.includes('super_admin')) return true;
    
    return false;
  };

  const isAdmin = () => {
    return hasRole('admin') || hasRole('super_admin');
  };

  const isSuperAdmin = () => {
    return hasRole('super_admin');
  };

  const getResourcePermissions = (resource) => {
    const resourcePermissions = permissions.filter(p => 
      p.startsWith(`${resource}:`)
    );
    
    return resourcePermissions.map(p => p.split(':')[1]);
  };

  return {
    permissions,
    roles,
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAllPermissions,
    hasAnyRole,
    hasAllRoles,
    canAccess,
    isAdmin,
    isSuperAdmin,
    getResourcePermissions,
    isAuthenticated: !!user
  };
};