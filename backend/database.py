import os
import psycopg2

DB_NAME = "flood_nowcasting"
DB_USER = "postgres"
DB_HOST = "localhost"
DB_PORT = 5432


def get_db_connection():
    """Establishes and returns a connection to the PostgreSQL database."""
    password = os.getenv("POSTGRES_PASSWORD")
    if not password:
        raise ValueError("Environment variable POSTGRES_PASSWORD is not set.")

    return psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=password,
        host=DB_HOST,
        port=DB_PORT,
    )


def test_connection():
    """Tests the PostgreSQL database connection."""
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT 1;")
        cursor.fetchone()
        cursor.close()
        connection.close()
        print("Database connection successful!")
        return True
    except Exception as e:
        print(f"Database connection failed: {e}")
        return False


if __name__ == "__main__":
    test_connection()
