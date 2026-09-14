"""Keep bounded prototype forecast results in durable PostgreSQL storage."""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = '20260914_0003'
down_revision = '20260913_0002'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('forecast_runs', sa.Column('result_payload', postgresql.JSONB(), nullable=True))


def downgrade():
    op.drop_column('forecast_runs', 'result_payload')
