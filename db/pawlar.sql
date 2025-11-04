--
-- PostgreSQL database dump
--

\restrict leSzc5WZeRNSCLfPgFxnl0TuHsTHRvZEozirf3p5tHaIwTWXr1VXCJAX2Q6wbey

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_verified; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_verified AS ENUM (
    '0',
    '1'
);


ALTER TYPE public.enum_verified OWNER TO postgres;

--
-- Name: checkuserexist(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.checkuserexist(_email character varying) RETURNS boolean
    LANGUAGE plpgsql
    AS $$

DECLARE 
  user_count INT;
BEGIN
  SELECT COUNT(*) INTO user_count
  FROM users
  WHERE email = _email;

  IF user_count > 0 THEN
    RETURN TRUE;
  ELSE 
    RETURN FALSE;
  END IF;
END;
$$;


ALTER FUNCTION public.checkuserexist(_email character varying) OWNER TO postgres;

--
-- Name: clear_verification_fields(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.clear_verification_fields() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

BEGIN 

  IF OLD.verified = '0' AND NEW.verified = '1' THEN
    NEW.last_otp_sent_at := NULL;
        NEW.verification_expires_at := NULL;
		   NEW.verification_code := NULL;

  END IF;

  RETURN NEW;

END;

$$;


ALTER FUNCTION public.clear_verification_fields() OWNER TO postgres;

--
-- Name: create_user(character varying, character varying, character varying, text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.create_user(IN fname character varying, IN lname character varying, IN _email character varying, IN _password text DEFAULT NULL::text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF _password IS NULL THEN
        INSERT INTO users (first_name, last_name, email)
        VALUES (fName, lName, _email);
    ELSE
       INSERT INTO users (first_name, last_name, email, password)
       VALUES (fName, lName, _email, _password);
    END IF;
END;
$$;


ALTER PROCEDURE public.create_user(IN fname character varying, IN lname character varying, IN _email character varying, IN _password text) OWNER TO postgres;

--
-- Name: createotpcredentials(character varying, integer, timestamp without time zone, timestamp without time zone); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.createotpcredentials(IN _email character varying, IN verificationcode integer, IN lastotpsentat timestamp without time zone, IN verificationexpiresat timestamp without time zone)
    LANGUAGE plpgsql
    AS $$
BEGIN 

UPDATE users SET 
verification_code = verificationCode, last_otp_sent_at = lastOtpSentAT, 
verification_expires_at = verificationExpiresAt
WHERE email = _email;

END;

$$;


ALTER PROCEDURE public.createotpcredentials(IN _email character varying, IN verificationcode integer, IN lastotpsentat timestamp without time zone, IN verificationexpiresat timestamp without time zone) OWNER TO postgres;

--
-- Name: createotpcredentials(character varying, text, timestamp without time zone, timestamp without time zone); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.createotpcredentials(IN _email character varying, IN verificationcode text, IN lastotpsentat timestamp without time zone, IN verificationexpiresat timestamp without time zone)
    LANGUAGE plpgsql
    AS $$

BEGIN 

UPDATE users SET 
verification_code = verificationCode, last_otp_sent_at = lastOtpSentAT, 
verification_expires_at = verificationExpiresAt
WHERE email = _email;

END;

$$;


ALTER PROCEDURE public.createotpcredentials(IN _email character varying, IN verificationcode text, IN lastotpsentat timestamp without time zone, IN verificationexpiresat timestamp without time zone) OWNER TO postgres;

--
-- Name: fn_get_otp_details(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_get_otp_details(_email character varying) RETURNS TABLE(stored_code text, expires_at timestamp without time zone)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        verification_code,
        verification_expires_at
    FROM 
        password_reset_token
    WHERE 
        email = _email;
END;
$$;


ALTER FUNCTION public.fn_get_otp_details(_email character varying) OWNER TO postgres;

--
-- Name: getuserinfobyemail(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getuserinfobyemail(p_email text) RETURNS TABLE(first_name character varying, last_name character varying, email character varying, password text, verification_code text)
    LANGUAGE plpgsql
    AS $$

BEGIN
    RETURN QUERY
    SELECT u.first_name, u.last_name, u.email, u.password, u.verification_code
    FROM users u
    WHERE u.email = p_email;
END;
$$;


ALTER FUNCTION public.getuserinfobyemail(p_email text) OWNER TO postgres;

--
-- Name: set_verified_by_email(character varying, public.enum_verified); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.set_verified_by_email(IN _email character varying, IN _verified public.enum_verified)
    LANGUAGE plpgsql
    AS $$

BEGIN
 UPDATE users SET verified = _verified WHERE email = _email;
END;
$$;


ALTER PROCEDURE public.set_verified_by_email(IN _email character varying, IN _verified public.enum_verified) OWNER TO postgres;

--
-- Name: sp_delete_otp(character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_delete_otp(IN _email character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM password_reset_token
    WHERE email = _email;
END;
$$;


ALTER PROCEDURE public.sp_delete_otp(IN _email character varying) OWNER TO postgres;

--
-- Name: sp_upsert_otp(character varying, text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_upsert_otp(IN _email character varying, IN _hashed_code text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO password_reset_token (email, verification_code, last_otp_sent_at, verification_expires_at)
    VALUES (_email, _hashed_code, NOW(), NOW() + INTERVAL '10 minutes')
    ON CONFLICT (email) 
    DO UPDATE SET
        verification_code = _hashed_code,
        last_otp_sent_at = NOW(),
        verification_expires_at = NOW() + INTERVAL '10 minutes';
END;
$$;


ALTER PROCEDURE public.sp_upsert_otp(IN _email character varying, IN _hashed_code text) OWNER TO postgres;

--
-- Name: updateuserpasswordbyemail(character varying, text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.updateuserpasswordbyemail(IN _email character varying, IN _new_password text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE users
    SET password = _new_password
    WHERE email = _email;
END;
$$;


ALTER PROCEDURE public.updateuserpasswordbyemail(IN _email character varying, IN _new_password text) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: password_reset_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password_reset_token (
    id integer NOT NULL,
    email character varying(150),
    last_otp_sent_at timestamp without time zone,
    verification_expires_at timestamp without time zone,
    verification_code text
);


ALTER TABLE public.password_reset_token OWNER TO postgres;

--
-- Name: password_reset_token_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.password_reset_token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.password_reset_token_id_seq OWNER TO postgres;

--
-- Name: password_reset_token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.password_reset_token_id_seq OWNED BY public.password_reset_token.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    phone_number character varying(100),
    password text,
    last_otp_sent_at timestamp without time zone,
    verification_expires_at timestamp without time zone,
    verified public.enum_verified DEFAULT '0'::public.enum_verified,
    verification_code text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: password_reset_token id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_token ALTER COLUMN id SET DEFAULT nextval('public.password_reset_token_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: password_reset_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.password_reset_token (id, email, last_otp_sent_at, verification_expires_at, verification_code) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, email, phone_number, password, last_otp_sent_at, verification_expires_at, verified, verification_code) FROM stdin;
51	Jhonwell	Espanola	jhonwellespanola4@gmail.com	\N	$2b$10$zwJ1qlz1gjU0Hh.xtwc79uyrdk2DP4/50gl7Hy9/rYOsh86GpT1/u	2025-11-03 19:28:18.616	2025-11-03 19:38:18.616	0	$2b$10$uLNlw8mLGSuTfAre157uru/EZbSU7w5gxmCws4DDLXLTYuZan1Hi6
\.


--
-- Name: password_reset_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.password_reset_token_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 51, true);


--
-- Name: password_reset_token password_reset_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_token
    ADD CONSTRAINT password_reset_token_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users after_validate_update; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER after_validate_update BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.clear_verification_fields();


--
-- PostgreSQL database dump complete
--

\unrestrict leSzc5WZeRNSCLfPgFxnl0TuHsTHRvZEozirf3p5tHaIwTWXr1VXCJAX2Q6wbey

