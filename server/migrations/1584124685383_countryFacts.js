/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('countries', {
      id: 'id',
      name: {type: 'text', notNull: true},
    
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),

    },
    })

    pgm.sql(`
      INSERT INTO countries (name)
        VALUES
          ('Canada'),
          ('Bangladesh'),
          ('Australia'),
          ('United States of America'),
          ('Mexico'),
          ('United Kingdom'),
          ('France'),
          ('Germany'),
          ('China'),
          ('Japan'),
          ('South Korea'),
          ('Saudia Arabia'),
          ('United Arab Emirates'),
          ('Russia'),
          ('South Africa'),
          ('Morocco'),
          ('Italy'),
          ('India'),
          ('Egypt'),
          ('Indonesia');
      
    `)
}

exports.down = pgm => {}