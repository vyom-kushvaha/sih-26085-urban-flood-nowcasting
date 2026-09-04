from demo_data import CITY_DATA


def get_demo_city(city):
    """Return all demo areas for a city."""
    return CITY_DATA.get(city)


def get_demo_area(city, area):
    """Return demo data for one city and area."""
    city_data = CITY_DATA.get(city)

    if city_data is None:
        return None

    return city_data.get(area)
