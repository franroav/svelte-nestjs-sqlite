import { Column, Table, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Fruta } from '../../frutas/entities/fruta.entity';
import { Variedad } from '../../variedades/entities/variedade.entity';
import { Agricultor } from '../../agricultores/entities/agricultore.entity';
import { Campo } from '../../campos/entities/campo.entity';

@Table({
  tableName: 'cosechas',
})
export class Cosecha extends Model {
  @ForeignKey(() => Fruta)
  @Column
  frutaId: number;

  @ForeignKey(() => Variedad)
  @Column
  variedadeId: number;

  @ForeignKey(() => Agricultor)
  @Column
  agricultorId: number;

  @ForeignKey(() => Campo)
  @Column
  campoId: number;

  @Column
  fechaCosecha: Date;

  @Column
  cantidad: number;

  @BelongsTo(() => Fruta)
  fruta: Fruta;

  @BelongsTo(() => Variedad)
  variedade: Variedad;

  @BelongsTo(() => Agricultor)
  agricultor: Agricultor;

  @BelongsTo(() => Campo)
  campo: Campo;
}
