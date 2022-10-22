from rest_framework import permissions


class ObjectOwnerOrAdmin(permissions.BasePermission):
    edit_methods = ("POST", "PUT", "PATCH", "DELETE")

    def has_permission(self, request, view):
        if permissions.IsAuthenticatedOrReadOnly:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if obj.owner.id == request.user.id or request.user.is_superuser:
            return True
        return False
