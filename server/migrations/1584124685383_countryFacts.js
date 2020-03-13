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

    pgm.createTable('facts', {
     id: 'id',
     capital: {type:'text', notNull: true},
     population: {type:'text', notNull: true},
     area: {type:'text', notNull: true},
     home_country_id: {
             type: 'int',
             notNull: true,
             references: 'countries',
             onDelete: 'cascade',
     },

     createdAt: {
       type: 'timestamp',
       notNull: true,
       default: pgm.func('current_timestamp'),
     }
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
      
     INSERT INTO facts (
          capital,
          population,
          area,
          home_country_id
          )
          VALUES
               ('Ottawa', '38 Mil.' , '9.98 mil. sq. km', 1),
               ('Dhaka', '169 Mil' , '0.14 mil. sq. km', 2),
               ('Washington D.C.', '329 Mil.' , '9.52 mil. sq. km', 4),
               ('Jakarta', '267 Mil.' , '1.91 mil. sq. km', 20),
               ('Mexico City', '127 Mil.' , '1.96 mil. sq. km', 5),
               ('Beijing', '1401 Mil.' , '9.60 mil. sq. km', 9),
               ('Tokyo', '126 Mil.' , '0.38 mil. sq. km', 10),
               ('New Delhi', '1360 Mil.' , '3.29 mil. sq. km', 18),
               ('Rome', '60 Mil.' , '0.30 mil. sq. km', 17),
               ('Seoul', '52 Mil.' , '010 mil. sq. km', 11),
               ('Abu Dhabi', '9.9 Mil.' , '0.08 mil. sq. km', 13),
               ('Riyadh', '34 Mil.' , '2.14 mil. sq. km', 12),
               ('Cape Town', '58 Mil.' , '1.22 mil. sq. km', 15),
               ('Moscow', '147 Mil.' , '17.10 mil. sq. km', 14),
               ('Rabat', '35 Mil.' , '0.47 mil. sq. km', 16),
               ('Berlin', '83 Mil.' , '0.36 mil. sq. km', 8),
               ('Paris', '67 Mil.' , '0.54 mil. sq. km', 7),
               ('Cairo', '100 Mil.' , '1.00 mil. sq. km', 19),
               ('Canberra', '25 Mil.' , '7.69 mil. sq. km', 3),
               ('London', '66 Mil.' , '0.24 sq. km', 6);
       
    `)
}

exports.down = pgm => {}