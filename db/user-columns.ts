exports.userColumns = [
  { name: 'login', def: null },
  { name: 'name', def: null },
  { name: 'company', def: null },
  { name: 'type', def: null },
  { name: 'site_admin', def: null },
  { name: 'repos_url', def: null },
  {
    name: 'location',
    init(col) {
      return (col.value = 'Lisbon');
    },
  },
];
