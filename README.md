# StudentStats Backend (Node.js + Express + Sequelize)

Puerto de `StudentStats-Backend` (Go + Gin + GORM) a Node.js, manteniendo la misma
arquitectura en capas (routes → controllers → services → repositories → models)
y el mismo esquema de base (SQL Server).

## Cómo levantarlo

```bash
cp .env.example .env
docker compose up -d
npm install
npm run dev   # o: npm start
```

Al arrancar, `sequelize.sync({ alter: true })` crea/ajusta las tablas —
es el equivalente a `AutoMigrate` de GORM.

## Diferencias importantes respecto al proyecto Go

| Tema | Go (GORM) | Node (Sequelize) |
|---|---|---|
| Soft delete | `gorm.Model` + `DeletedAt` | `paranoid: true` |
| Nombres de columna | `gorm:"..."` tags | `field: "..."` o `underscored: true` |
| Relaciones | `foreignKey:` en el struct | `belongsTo`/`hasMany`/`belongsToMany` en `models/index.js` |
| SQL crudo | `config.DB.Raw(...)` | `sequelize.query(...)` |
| Decimal (Payment.amount) | `decimal.Decimal` + tag `type:decimal(10,2)` | `DataTypes.DECIMAL(10,2)` (Sequelize lo devuelve como string, no float, por la misma razón) |
| Fecha sin hora | `datatypes.Date` | `DataTypes.DATEONLY` |
| Solo horario | `datatypes.Time` | `DataTypes.TIME` |
| Manejo de errores | `if err != nil { return ... }` en cada línea | `try/catch` alrededor del handler |
| Imports sin usar | Error de compilación | Sin problema (usá ESLint si querés que te avise) |

## Endpoints principales

- `GET /api/students` / `GET /api/students/:id` / `GET /api/students/uid/:uid`
- `GET /api/students/:id/dashboard` — resumen: datos, próxima clase, próximo examen, pagos pendientes
- `POST /api/students` / `PUT /api/students/:id` / `DELETE /api/students/:id`
- Mismo patrón para `/api/subjects`, `/api/exams`, `/api/payments`
- `/api/student-subjects` y `/api/student-exams` para las tablas intermedias

## Pendiente / a revisar

- Validación de body (en Go usábamos los tags `binding:` de Gin; acá conviene sumar
  `express-validator` o `zod` si querés algo similar).
- El nombre de tabla que generó `AutoMigrate` en Go para `StudentSubject` puede no
  coincidir exactamente con `student_subjects` que asume la query cruda del
  dashboard — confirmalo contra tu base real antes de correr en serio.
