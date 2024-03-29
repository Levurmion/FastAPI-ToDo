"""empty message

Revision ID: fd35fa80b9d3
Revises: 206a83781064
Create Date: 2024-02-06 12:27:21.259911

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fd35fa80b9d3'
down_revision: Union[str, None] = '206a83781064'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comments', sa.Column('edited', sa.Boolean(), nullable=True))
    op.add_column('posts', sa.Column('edited', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('posts', 'edited')
    op.drop_column('comments', 'edited')
    # ### end Alembic commands ###
