CREATE OR REPLACE FUNCTION add_planet (name text)
    RETURNS bigint
    LANGUAGE plpgsql
    AS $$
DECLARE
    new_row bigint;
BEGIN
    INSERT INTO planets (name)
        VALUES (add_planet.name)
    RETURNING
        id INTO new_row;
    RETURN new_row;
END;
$$;

