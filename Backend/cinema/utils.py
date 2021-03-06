import datetime

import pytz

from cinema.movies.models import MovieGenre
from cinema.movies.serializers import MovieSerializer


def serialize_movies_with_genres(movies):
    serialized = MovieSerializer(movies, many=True).data

    for index, m in enumerate(movies):
        serialized[index]['genres'] = list(map(lambda r: r.genre.name, MovieGenre.objects.filter(movie=m)))

    if len(movies) > 1:
        return serialized
    elif len(movies) == 1:
        return serialized[0]
    return {}


def parse_raw_date(r_date):
    try:
        return datetime.datetime.strptime(r_date, '%Y/%m/%d')
    except:
        return None


def timezonize_date(date):
    timezone = pytz.timezone("Europe/Warsaw")
    return timezone.localize(date)


