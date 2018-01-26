export default function loadTables(orm) {
  orm.defineTable({
    name: 'users',

    props: {
      autoId: true,
      timestamps: true
    }
  });
}