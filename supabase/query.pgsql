CREATE OR REPLACE FUNCTION upsert_answer (question_id_input bigint, user_id_input uuid, chosen_option_input bigint)
        RETURNS VOID
        LANGUAGE plpgsql
        AS $$
BEGIN
        INSERT INTO testament_gen_question_answers (question_id, user_id, chosen_option)
                VALUES (question_id_input, user_id_input, chosen_option)
        ON CONFLICT
                DO NOTHING;
        UPDATE
                testament_gen_question_answers
        SET
                chosen_option = chosen_option_input
        WHERE
                question_id = question_id_input
                AND user_id = user_id_input;
END;
$$;

