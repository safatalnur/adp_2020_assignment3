/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

  pgm.createTable('languages', {
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

    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    }
  })


    pgm.createTable('countries', {
      id: 'id',
      name: {type: 'text', notNull: true},
      home_country_fact_id: {
        type: 'int',
        notNull: true,
        references: 'facts',
        onDelete: 'cascade',
      },

      home_language_id: {
        type: 'int',
        notNull: true,
        references: 'languages',
        onDelete: 'cascade',
      },
    
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),

    },
    })

    // pgm.createTable('facts', {
    //   id: 'id',
    //   capital: {type:'text', notNull: true},
    //   population: {type:'text', notNull: true},
    //   area: {type:'text', notNull: true},
    //   home_country_id: {
    //           type: 'int',
    //           notNull: true,
    //           references: 'countries',
    //           onDelete: 'cascade',
    //   },

    //   createdAt: {
    //     type: 'timestamp',
    //     notNull: true,
    //     default: pgm.func('current_timestamp'),
    //   }
    // })


    // pgm.createTable('facts')

    pgm.sql(`

    INSERT INTO languages (name)
    VALUES
        ('English'),
        ('French'),
        ('Korean'),
        ('Deutsch'),
        ('Mandarin'),
        ('Russian'),
        ('Arabic'),
        ('Italian'),
        ('Bengali'),
        ('Malay'),
        ('Japanese'),
        ('Cantonese'),
        ('Spanish'),
        ('Hindi'); 

        INSERT INTO facts (
          capital,
          population,
          area
        )
          VALUES
            ('Ottawa', '38 Mil.' , '9.98 mil. sq. km'),
            ('Dhaka', '169 Mil' , '0.14 mil. sq. km'),
            ('Washington D.C.', '329 Mil.' , '9.52 mil. sq. km'),
            ('Jakarta', '267 Mil.' , '1.91 mil. sq. km'),
            ('Mexico City', '127 Mil.' , '1.96 mil. sq. km'),
            ('Beijing', '1401 Mil.' , '9.60 mil. sq. km'),
            ('Tokyo', '126 Mil.' , '0.38 mil. sq. km'),
            ('New Delhi', '1360 Mil.' , '3.29 mil. sq. km'),
            ('Rome', '60 Mil.' , '0.30 mil. sq. km'),
            ('Seoul', '52 Mil.' , '010 mil. sq. km'),
            ('Abu Dhabi', '9.9 Mil.' , '0.08 mil. sq. km'),
            ('Riyadh', '34 Mil.' , '2.14 mil. sq. km'),
            ('Cape Town', '58 Mil.' , '1.22 mil. sq. km'),
            ('Moscow', '147 Mil.' , '17.10 mil. sq. km'),
            ('Rabat', '35 Mil.' , '0.47 mil. sq. km'),
            ('Berlin', '83 Mil.' , '0.36 mil. sq. km'),
            ('Paris', '67 Mil.' , '0.54 mil. sq. km'),
            ('Cairo', '100 Mil.' , '1.00 mil. sq. km'),
            ('Canberra', '25 Mil.' , '7.69 mil. sq. km'),
            ('London', '66 Mil.' , '0.24 sq. km');
  

      INSERT INTO countries (
        name,
        home_country_fact_id,
        home_language_id
      )
        VALUES
          ('Canada', 1, 1),
          ('Canada', 1, 2),
          ('Bangladesh', 2, 9),
          ('Australia', 19, 1),
          ('United States of America', 3, 1),
          ('Mexico', 5, 13),
          ('United Kingdom', 20, 1),
          ('France', 17, 2),
          ('Germany', 16, 4),
          ('China', 6, 5),
          ('China', 6, 12),
          ('Japan', 7, 11),
          ('South Korea', 10, 3),
          ('Saudia Arabia', 12, 7),
          ('United Arab Emirates', 11, 7),
          ('Russia', 14, 6),
          ('South Africa', 13, 1),
          ('Morocco', 15, 7),
          ('Italy', 9, 8),
          ('India', 8, 14),
          ('India', 8, 1),
          ('Egypt', 18, 7),
          ('Indonesia', 4, 10);
      

    `)
}

exports.down = pgm => {}