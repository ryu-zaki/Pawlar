--
-- PostgreSQL database dump
--

\restrict qWoXxJkq4dIY8AbzxilOtcwaQO395oFJx5XQIBEf8BuSKicKqe0I6VzG75A3FBb

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
-- Name: getuserinfobyemail(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getuserinfobyemail(p_email text) RETURNS TABLE(first_name character varying, last_name character varying, email character varying, password text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT u.first_name, u.last_name, u.email, u.password
    FROM users u
    WHERE u.email = p_email;
END;
$$;


ALTER FUNCTION public.getuserinfobyemail(p_email text) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    phone_number character varying(100),
    password text
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
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, email, phone_number, password) FROM stdin;
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 19, true);


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
-- PostgreSQL database dump complete
--

\unrestrict qWoXxJkq4dIY8AbzxilOtcwaQO395oFJx5XQIBEf8BuSKicKqe0I6VzG75A3FBb

