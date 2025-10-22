CREATE TABLE IF NOT EXISTS wedding_rsvp (
    id SERIAL PRIMARY KEY,
    guest_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    will_attend BOOLEAN NOT NULL,
    number_of_guests INTEGER DEFAULT 1,
    dietary_restrictions TEXT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_rsvp_email ON wedding_rsvp(email);
CREATE INDEX idx_rsvp_attendance ON wedding_rsvp(will_attend);

COMMENT ON TABLE wedding_rsvp IS 'Ответы гостей на свадебное приглашение';
COMMENT ON COLUMN wedding_rsvp.guest_name IS 'Имя гостя';
COMMENT ON COLUMN wedding_rsvp.email IS 'Email для связи';
COMMENT ON COLUMN wedding_rsvp.phone IS 'Телефон для связи';
COMMENT ON COLUMN wedding_rsvp.will_attend IS 'Будет ли гость присутствовать';
COMMENT ON COLUMN wedding_rsvp.number_of_guests IS 'Количество человек (включая гостя)';
COMMENT ON COLUMN wedding_rsvp.dietary_restrictions IS 'Особенности питания';
COMMENT ON COLUMN wedding_rsvp.message IS 'Сообщение от гостя';