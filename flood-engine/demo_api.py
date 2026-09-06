from demo_data import CITY_DATA


def get_demo_city(city):
    """Return all demo areas for a city (case-insensitive)."""
    for c, areas in CITY_DATA.items():
        if c.lower() == city.lower():
            return areas
    return None


def get_demo_area(city, area):
    """Return demo data for one city and area (case-insensitive)."""
    city_data = get_demo_city(city)
    if city_data is None:
        return None

    for a, data in city_data.items():
        if a.lower() == area.lower():
            return data

    return None
