CREATE TABLE IF NOT EXISTS public.logs
(
    id uuid NOT NULL,
    message character varying COLLATE pg_catalog."default" NOT NULL,
    message_type character varying COLLATE pg_catalog."default" NOT NULL,
    message_sent bigint NOT NULL,
    message_received bigint,
    elapsed_time bigint,
    CONSTRAINT logs_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.logs
    OWNER to postgres;