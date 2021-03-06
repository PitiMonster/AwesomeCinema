from django.contrib.auth.models import User
from rest_framework import serializers

from cinema.tickets.models import Hall, Screening, Ticket


class HallSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    rows = serializers.IntegerField()
    columns = serializers.IntegerField()


class ScreeningSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    hall_id = serializers.CharField(source='hall.id')
    hall = serializers.CharField(source='hall.name')
    movie_id = serializers.IntegerField(source='movie.id')
    movie_name = serializers.CharField(source='movie')
    date = serializers.DateTimeField(format='%Y/%m/%d %H:%M')

    class Meta:
        model = Screening
        fields = ('id', 'hall', 'movie', 'date')


class TicketSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    seat_number = serializers.IntegerField()
    hall = serializers.CharField(source='screening.hall.name')
    movie_id = serializers.IntegerField(source='screening.movie.id')
    movie_name = serializers.CharField(source='screening.movie')
    date = serializers.CharField(source='screening.date')
    owner_id = serializers.CharField(source='owner.id')
    owner_email = serializers.CharField(source='owner.email')
    used = serializers.BooleanField()

    class Meta:
        model = Screening
        fields = ('id', 'seat_number', 'screening', 'owner', 'used')

    def update_owner(self, instance: Ticket, new_owner: User):
        instance.owner = new_owner
        instance.save()
        return instance

    def use(self, instance: Ticket):
        instance.used = True



class FreeTicketSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    seat_number = serializers.IntegerField()
    hall = serializers.CharField(source='screening.hall.name')
    movie_id = serializers.IntegerField(source='screening.movie.id')
    movie_name = serializers.CharField(source='screening.movie')
    date = serializers.CharField(source='screening.date')
    owner_id = None
    owner_email = None
    used = serializers.BooleanField()

    class Meta:
        model = Screening
        fields = ('id', 'seat_number', 'screening', 'owner', 'used')

    def update_owner(self, instance: Ticket, new_owner: User):
        instance.owner = new_owner
        instance.save()
        return instance

    def use(self, instance: Ticket):
        instance.used = True
