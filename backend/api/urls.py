from django.urls import path
from . import views


urlpatterns = [
    path("", views.default_view, name="default"),
    path("models", views.get_models, name="models"),
    path("<str:video_id>/", views.get_ytb_video_data, name="data"),
    path("<str:video_id>/<str:model>", views.get_ytb_comms, name="sentiment")
]
