"""Durable civic operations and transactional audit records."""
from alembic import op
import sqlalchemy as sa

revision = "20260913_0002"
down_revision = "20260913_0001"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table("civic_records",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("kind", sa.String(24), nullable=False),
        sa.Column("status", sa.String(24), nullable=False),
        sa.Column("payload", sa.JSON(), nullable=False),
        sa.Column("created_at", sa.String(40), nullable=False),
        sa.Column("revision", sa.Integer(), nullable=False))
    op.create_index("ix_civic_records_kind", "civic_records", ["kind"])
    op.create_index("ix_civic_records_status", "civic_records", ["status"])


def downgrade():
    op.drop_table("civic_records")
