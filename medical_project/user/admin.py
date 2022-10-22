from django.contrib import admin
from user.models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ['iin', 'full_name', 'created_at', 'is_superuser']
    ordering = ['-created_at']
    readonly_fields = ('iin', 'name', 'surname', 'birth_date', 'avatar')
    search_fields = ['iin', 'name', 'surname']

    def has_change_permission(self, request, obj=None)-> bool:
        return True if request.user.is_superuser else False
    def has_delete_permission(self, request, obj=None) -> bool:
        return True if request.user.is_superuser else False

admin.site.register(User, UserAdmin)