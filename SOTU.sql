--
-- PostgreSQL database dump
--

-- Dumped from database version 11.1
-- Dumped by pg_dump version 11.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: presidents; Type: TABLE; Schema: public; Owner: madelainebolton
--

CREATE TABLE public.presidents (
    pres_id integer NOT NULL,
    name character varying(100),
    party_affiliation character varying(100),
    date_of_birth timestamp without time zone,
    state_of_birth character varying(30)
);


ALTER TABLE public.presidents OWNER TO madelainebolton;

--
-- Name: presidents_pres_id_seq; Type: SEQUENCE; Schema: public; Owner: madelainebolton
--

CREATE SEQUENCE public.presidents_pres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.presidents_pres_id_seq OWNER TO madelainebolton;

--
-- Name: presidents_pres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: madelainebolton
--

ALTER SEQUENCE public.presidents_pres_id_seq OWNED BY public.presidents.pres_id;


--
-- Name: speeches; Type: TABLE; Schema: public; Owner: madelainebolton
--

CREATE TABLE public.speeches (
    speech_id integer NOT NULL,
    year integer,
    date timestamp without time zone,
    pres_id integer,
    delivery character varying(20),
    text text,
    doc_path text
);


ALTER TABLE public.speeches OWNER TO madelainebolton;

--
-- Name: speeches_speech_id_seq; Type: SEQUENCE; Schema: public; Owner: madelainebolton
--

CREATE SEQUENCE public.speeches_speech_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.speeches_speech_id_seq OWNER TO madelainebolton;

--
-- Name: speeches_speech_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: madelainebolton
--

ALTER SEQUENCE public.speeches_speech_id_seq OWNED BY public.speeches.speech_id;


--
-- Name: years; Type: TABLE; Schema: public; Owner: madelainebolton
--

CREATE TABLE public.years (
    year integer NOT NULL,
    pres_id integer
);


ALTER TABLE public.years OWNER TO madelainebolton;

--
-- Name: presidents pres_id; Type: DEFAULT; Schema: public; Owner: madelainebolton
--

ALTER TABLE ONLY public.presidents ALTER COLUMN pres_id SET DEFAULT nextval('public.presidents_pres_id_seq'::regclass);


--
-- Name: speeches speech_id; Type: DEFAULT; Schema: public; Owner: madelainebolton
--

ALTER TABLE ONLY public.speeches ALTER COLUMN speech_id SET DEFAULT nextval('public.speeches_speech_id_seq'::regclass);


--
-- Data for Name: presidents; Type: TABLE DATA; Schema: public; Owner: madelainebolton
--

COPY public.presidents (pres_id, name, party_affiliation, date_of_birth, state_of_birth) FROM stdin;
1	George Washington	Unaffiliated	1732-02-22 00:00:00	Virginia
2	John Adams	Federalist	1735-10-30 00:00:00	Massachusetts
3	Thomas Jefferson	Democratic-Republican	1743-04-13 00:00:00	Virginia
4	James Madison	Democratic-Republican	1751-03-16 00:00:00	Virginia
5	James Monroe	Democratic-Republican	1758-04-28 00:00:00	Virginia
6	John Quincy Adams	Democratic-Republican	1767-07-11 00:00:00	Massachusetts
7	Andrew Jackson	Democratic	1767-03-15 00:00:00	South/North Carolina
8	Martin van Buren	Democratic	1782-12-05 00:00:00	New York
9	William Henry Harrison	Whig	1773-02-09 00:00:00	Virginia
10	John Tyler	Whig	1790-03-29 00:00:00	Virginia
11	James K. Polk	Democratic	1795-11-02 00:00:00	North Carolina
12	Zachary Taylor	Whig	1784-11-24 00:00:00	Virginia
13	Millard Fillmore	Whig	1800-01-07 00:00:00	New York
14	Franklin Pierce	Democratic	1804-11-23 00:00:00	New Hampshire
15	James Buchanan	Democratic	1791-04-23 00:00:00	Pennsylvania
16	Abraham Lincoln	Republican	1809-02-12 00:00:00	Kentucky
17	Andrew Johnson	Democratic	1808-12-29 00:00:00	North Carolina
18	Ulysses S. Grant	Republican	1822-04-27 00:00:00	Ohio
19	Rutherford B. Hayes	Republican	1822-10-04 00:00:00	Ohio
20	James A. Garfield	Republican	1831-11-19 00:00:00	Ohio
21	Chester A. Arthur	Republican	1829-10-05 00:00:00	Vermont
22	Grover Cleveland	Democratic	1837-03-18 00:00:00	New Jersey
23	Benjamin Harrison	Republican	1833-08-20 00:00:00	Ohio
24	William McKinley	Republican	1843-01-29 00:00:00	Ohio
25	Theodore Roosevelt	Republican	1858-10-27 00:00:00	New York
26	William Howard Taft	Republican	1857-09-15 00:00:00	Ohio
27	Woodrow Wilson	Democratic	1856-12-28 00:00:00	Virginia
28	Warren G. Harding	Republican	1865-11-02 00:00:00	Ohio
29	Calvin Coolidge	Republican	1872-07-04 00:00:00	Vermont
30	Herbert Hoover	Republican	1874-08-10 00:00:00	Iowa
31	Franklin D. Roosevelt	Democratic	1882-01-30 00:00:00	New York
32	Harry S. Truman	Democratic	1884-05-08 00:00:00	Missouri
33	Dwight D. Eisenhower	Republican	1890-10-14 00:00:00	Texas
34	John F. Kennedy	Democratic	1917-05-29 00:00:00	Massachusetts
35	Lyndon B. Johnson	Democratic	1908-08-27 00:00:00	Texas
36	Richard Nixon	Republican	1913-01-09 00:00:00	California
37	Gerald Ford	Republican	1913-07-14 00:00:00	Nebraska
38	Jimmy Carter	Democratic	1924-10-01 00:00:00	Georgia
39	Ronald Reagan	Republican	1911-02-06 00:00:00	Illinois
40	George H. W. Bush	Republican	1924-06-12 00:00:00	Massachusetts
41	Bill Clinton	Democratic	1946-08-19 00:00:00	Arkansas
42	George W. Bush	Republican	1946-07-06 00:00:00	Connecticut
43	Barack Obama	Democratic	1961-08-04 00:00:00	Hawaii
44	Donald Trump	Republican	1946-06-14 00:00:00	New York
\.


--
-- Data for Name: speeches; Type: TABLE DATA; Schema: public; Owner: madelainebolton
--

COPY public.speeches (speech_id, year, date, pres_id, delivery, text, doc_path) FROM stdin;
1	1790	1790-01-08 00:00:00	1	Address	./speech_text/Washington_1790.txt	./speech_doc/Washington_1790.doc
2	1790	1790-12-08 00:00:00	1	Address	./speech_text/Washington_1790_2.txt	./speech_doc/Washington_1790_2.doc
3	1791	1791-10-25 00:00:00	1	Address	./speech_text/Washington_1791.txt	./speech_doc/Washington_1791.doc
4	1792	1792-11-06 00:00:00	1	Address	./speech_text/Washington_1792.txt	./speech_doc/Washington_1792.doc
5	1793	1793-12-03 00:00:00	1	Address	./speech_text/Washington_1793.txt	./speech_doc/Washington_1793.doc
6	1794	1794-11-19 00:00:00	1	Address	./speech_text/Washington_1794.txt	./speech_doc/Washington_1794.doc
7	1795	1795-12-08 00:00:00	1	Address	./speech_text/Washington_1795.txt	./speech_doc/Washington_1795.doc
8	1796	1796-12-07 00:00:00	1	Address	./speech_text/Washington_1796.txt	./speech_doc/Washington_1796.doc
9	1797	1797-11-22 00:00:00	2	Address	./speech_text/Adams_1797.txt	./speech_doc/Adams_1797.doc
10	1798	1798-12-08 00:00:00	2	Address	./speech_text/Adams_1798.txt	./speech_doc/Adams_1798.doc
11	1799	1799-12-03 00:00:00	2	Address	./speech_text/Adams_1799.txt	./speech_doc/Adams_1799.doc
12	1800	1800-11-22 00:00:00	2	Address	./speech_text/Adams_1800.txt	./speech_doc/Adams_1800.doc
13	1801	1801-12-08 00:00:00	3	Message	./speech_text/Jefferson_1801.txt	./speech_doc/Jefferson_1801.doc
14	1802	1802-12-15 00:00:00	3	Message	./speech_text/Jefferson_1802.txt	./speech_doc/Jefferson_1802.doc
15	1803	1803-10-17 00:00:00	3	Message	./speech_text/Jefferson_1803.txt	./speech_doc/Jefferson_1803.doc
16	1804	1804-11-08 00:00:00	3	Message	./speech_text/Jefferson_1804.txt	./speech_doc/Jefferson_1804.doc
17	1805	1805-12-03 00:00:00	3	Message	./speech_text/Jefferson_1805.txt	./speech_doc/Jefferson_1805.doc
18	1806	1806-12-02 00:00:00	3	Message	./speech_text/Jefferson_1806.txt	./speech_doc/Jefferson_1806.doc
19	1807	1807-10-27 00:00:00	3	Message	./speech_text/Jefferson_1807.txt	./speech_doc/Jefferson_1807.doc
20	1808	1808-11-08 00:00:00	3	Message	./speech_text/Jefferson_1808.txt	./speech_doc/Jefferson_1808.doc
21	1809	1809-11-29 00:00:00	4	Message	./speech_text/Madison_1809.txt	./speech_doc/Madison_1809.doc
22	1810	1810-12-05 00:00:00	4	Message	./speech_text/Madison_1810.txt	./speech_doc/Madison_1810.doc
23	1811	1811-11-05 00:00:00	4	Message	./speech_text/Madison_1811.txt	./speech_doc/Madison_1811.doc
24	1812	1812-11-04 00:00:00	4	Message	./speech_text/Madison_1812.txt	./speech_doc/Madison_1812.doc
25	1813	1813-12-07 00:00:00	4	Message	./speech_text/Madison_1813.txt	./speech_doc/Madison_1813.doc
26	1814	1814-09-20 00:00:00	4	Message	./speech_text/Madison_1814.txt	./speech_doc/Madison_1814.doc
27	1815	1815-12-05 00:00:00	4	Message	./speech_text/Madison_1815.txt	./speech_doc/Madison_1815.doc
28	1816	1816-12-03 00:00:00	4	Message	./speech_text/Madison_1816.txt	./speech_doc/Madison_1816.doc
29	1817	1817-12-02 00:00:00	5	Message	./speech_text/Monroe_1817.txt	./speech_doc/Monroe_1817.doc
30	1818	1818-11-16 00:00:00	5	Message	./speech_text/Monroe_1818.txt	./speech_doc/Monroe_1818.doc
31	1819	1819-12-07 00:00:00	5	Message	./speech_text/Monroe_1819.txt	./speech_doc/Monroe_1819.doc
32	1820	1820-11-14 00:00:00	5	Message	./speech_text/Monroe_1820.txt	./speech_doc/Monroe_1820.doc
33	1821	1821-12-03 00:00:00	5	Message	./speech_text/Monroe_1821.txt	./speech_doc/Monroe_1821.doc
34	1822	1822-12-03 00:00:00	5	Message	./speech_text/Monroe_1822.txt	./speech_doc/Monroe_1822.doc
35	1823	1823-12-02 00:00:00	5	Message	./speech_text/Monroe_1823.txt	./speech_doc/Monroe_1823.doc
36	1824	1824-12-07 00:00:00	5	Message	./speech_text/Monroe_1824.txt	./speech_doc/Monroe_1824.doc
37	1825	1825-12-06 00:00:00	6	Message	./speech_text/Qadams_1825.txt	./speech_doc/Qadams_1825.doc
38	1826	1826-12-05 00:00:00	6	Message	./speech_text/Qadams_1826.txt	./speech_doc/Qadams_1826.doc
39	1827	1827-12-04 00:00:00	6	Message	./speech_text/Qadams_1827.txt	./speech_doc/Qadams_1827.doc
40	1828	1828-12-02 00:00:00	6	Message	./speech_text/Qadams_1828.txt	./speech_doc/Qadams_1828.doc
41	1829	1829-12-08 00:00:00	7	Message	./speech_text/Jackson_1829.txt	./speech_doc/Jackson_1829.doc
42	1830	1830-12-06 00:00:00	7	Message	./speech_text/Jackson_1830.txt	./speech_doc/Jackson_1830.doc
43	1831	1831-12-06 00:00:00	7	Message	./speech_text/Jackson_1831.txt	./speech_doc/Jackson_1831.doc
44	1832	1832-12-04 00:00:00	7	Message	./speech_text/Jackson_1832.txt	./speech_doc/Jackson_1832.doc
45	1833	1833-12-03 00:00:00	7	Message	./speech_text/Jackson_1833.txt	./speech_doc/Jackson_1833.doc
46	1834	1834-12-01 00:00:00	7	Message	./speech_text/Jackson_1834.txt	./speech_doc/Jackson_1834.doc
47	1835	1835-12-08 00:00:00	7	Message	./speech_text/Jackson_1835.txt	./speech_doc/Jackson_1835.doc
48	1836	1836-12-06 00:00:00	7	Message	./speech_text/Jackson_1836.txt	./speech_doc/Jackson_1836.doc
49	1837	1837-12-05 00:00:00	8	Message	./speech_text/Buren_1837.txt	./speech_doc/Buren_1837.doc
50	1838	1838-12-03 00:00:00	8	Message	./speech_text/Buren_1838.txt	./speech_doc/Buren_1838.doc
51	1839	1839-12-02 00:00:00	8	Message	./speech_text/Buren_1839.txt	./speech_doc/Buren_1839.doc
52	1840	1840-12-05 00:00:00	8	Message	./speech_text/Buren_1840.txt	./speech_doc/Buren_1840.doc
53	1841	1841-12-07 00:00:00	10	Message	./speech_text/Tyler_1841.txt	./speech_doc/Tyler_1841.doc
54	1842	1842-12-06 00:00:00	10	Message	./speech_text/Tyler_1842.txt	./speech_doc/Tyler_1842.doc
55	1843	1843-12-05 00:00:00	10	Message	./speech_text/Tyler_1843.txt	./speech_doc/Tyler_1843.doc
56	1844	1844-12-03 00:00:00	10	Message	./speech_text/Tyler_1844.txt	./speech_doc/Tyler_1844.doc
57	1845	1845-12-02 00:00:00	11	Message	./speech_text/Polk_1845.txt	./speech_doc/Polk_1845.doc
58	1846	1846-12-08 00:00:00	11	Message	./speech_text/Polk_1846.txt	./speech_doc/Polk_1846.doc
59	1847	1847-12-07 00:00:00	11	Message	./speech_text/Polk_1847.txt	./speech_doc/Polk_1847.doc
60	1848	1848-12-05 00:00:00	11	Message	./speech_text/Polk_1848.txt	./speech_doc/Polk_1848.doc
61	1849	1849-12-04 00:00:00	12	Message	./speech_text/Taylor_1849.txt	./speech_doc/Taylor_1849.doc
62	1850	1850-12-02 00:00:00	13	Message	./speech_text/Fillmore_1850.txt	./speech_doc/Fillmore_1850.doc
63	1851	1851-12-02 00:00:00	13	Message	./speech_text/Fillmore_1851.txt	./speech_doc/Fillmore_1851.doc
64	1852	1852-12-06 00:00:00	13	Message	./speech_text/Fillmore_1852.txt	./speech_doc/Fillmore_1852.doc
65	1853	1853-12-05 00:00:00	14	Message	./speech_text/Pierce_1853.txt	./speech_doc/Pierce_1853.doc
66	1854	1854-12-04 00:00:00	14	Message	./speech_text/Pierce_1854.txt	./speech_doc/Pierce_1854.doc
67	1855	1855-12-31 00:00:00	14	Message	./speech_text/Pierce_1855.txt	./speech_doc/Pierce_1855.doc
68	1856	1856-12-02 00:00:00	14	Message	./speech_text/Pierce_1856.txt	./speech_doc/Pierce_1856.doc
69	1857	1857-12-08 00:00:00	15	Message	./speech_text/Buchanan_1857.txt	./speech_doc/Buchanan_1857.doc
70	1858	1858-12-06 00:00:00	15	Message	./speech_text/Buchanan_1858.txt	./speech_doc/Buchanan_1858.doc
71	1859	1859-12-19 00:00:00	15	Message	./speech_text/Buchanan_1859.txt	./speech_doc/Buchanan_1859.doc
72	1860	1860-12-03 00:00:00	15	Message	./speech_text/Buchanan_1860.txt	./speech_doc/Buchanan_1860.doc
73	1861	1861-12-03 00:00:00	16	Message	./speech_text/Lincoln_1861.txt	./speech_doc/Lincoln_1861.doc
74	1862	1862-12-01 00:00:00	16	Message	./speech_text/Lincoln_1862.txt	./speech_doc/Lincoln_1862.doc
75	1863	1863-12-08 00:00:00	16	Message	./speech_text/Lincoln_1863.txt	./speech_doc/Lincoln_1863.doc
76	1864	1864-12-06 00:00:00	16	Message	./speech_text/Lincoln_1864.txt	./speech_doc/Lincoln_1864.doc
77	1865	1865-12-04 00:00:00	17	Message	./speech_text/Johnson_1865.txt	./speech_doc/Johnson_1865.doc
78	1866	1866-12-03 00:00:00	17	Message	./speech_text/Johnson_1866.txt	./speech_doc/Johnson_1866.doc
79	1867	1867-12-03 00:00:00	17	Message	./speech_text/Johnson_1867.txt	./speech_doc/Johnson_1867.doc
80	1868	1868-12-09 00:00:00	17	Message	./speech_text/Johnson_1868.txt	./speech_doc/Johnson_1868.doc
81	1869	1869-12-06 00:00:00	18	Message	./speech_text/Grant_1869.txt	./speech_doc/Grant_1869.doc
82	1870	1870-12-05 00:00:00	18	Message	./speech_text/Grant_1870.txt	./speech_doc/Grant_1870.doc
83	1871	1871-12-04 00:00:00	18	Message	./speech_text/Grant_1871.txt	./speech_doc/Grant_1871.doc
84	1872	1872-12-02 00:00:00	18	Message	./speech_text/Grant_1872.txt	./speech_doc/Grant_1872.doc
85	1873	1873-12-01 00:00:00	18	Message	./speech_text/Grant_1873.txt	./speech_doc/Grant_1873.doc
86	1874	1874-12-07 00:00:00	18	Message	./speech_text/Grant_1874.txt	./speech_doc/Grant_1874.doc
87	1875	1875-12-07 00:00:00	18	Message	./speech_text/Grant_1875.txt	./speech_doc/Grant_1875.doc
88	1876	1876-12-05 00:00:00	18	Message	./speech_text/Grant_1876.txt	./speech_doc/Grant_1876.doc
89	1877	1877-12-03 00:00:00	19	Message	./speech_text/Hayes_1877.txt	./speech_doc/Hayes_1877.doc
90	1878	1878-12-02 00:00:00	19	Message	./speech_text/Hayes_1878.txt	./speech_doc/Hayes_1878.doc
91	1879	1879-12-01 00:00:00	19	Message	./speech_text/Hayes_1879.txt	./speech_doc/Hayes_1879.doc
92	1880	1880-12-06 00:00:00	19	Message	./speech_text/Hayes_1880.txt	./speech_doc/Hayes_1880.doc
93	1881	1881-12-06 00:00:00	21	Message	./speech_text/Arthur_1881.txt	./speech_doc/Arthur_1881.doc
94	1882	1882-12-04 00:00:00	21	Message	./speech_text/Arthur_1882.txt	./speech_doc/Arthur_1882.doc
95	1883	1883-12-04 00:00:00	21	Message	./speech_text/Arthur_1883.txt	./speech_doc/Arthur_1883.doc
96	1884	1884-12-01 00:00:00	21	Message	./speech_text/Arthur_1884.txt	./speech_doc/Arthur_1884.doc
97	1885	1885-12-08 00:00:00	22	Message	./speech_text/Cleveland_1885.txt	./speech_doc/Cleveland_1885.doc
98	1886	1886-12-06 00:00:00	22	Message	./speech_text/Cleveland_1886.txt	./speech_doc/Cleveland_1886.doc
99	1887	1887-12-06 00:00:00	22	Message	./speech_text/Cleveland_1887.txt	./speech_doc/Cleveland_1887.doc
100	1888	1888-12-03 00:00:00	22	Message	./speech_text/Cleveland_1888.txt	./speech_doc/Cleveland_1888.doc
101	1889	1889-12-03 00:00:00	23	Message	./speech_text/Harrison_1889.txt	./speech_doc/Harrison_1889.doc
102	1890	1890-12-01 00:00:00	23	Message	./speech_text/Harrison_1890.txt	./speech_doc/Harrison_1890.doc
103	1891	1891-12-09 00:00:00	23	Message	./speech_text/Harrison_1891.txt	./speech_doc/Harrison_1891.doc
104	1892	1892-12-06 00:00:00	23	Message	./speech_text/Harrison_1892.txt	./speech_doc/Harrison_1892.doc
105	1893	1893-12-04 00:00:00	22	Message	./speech_text/Cleveland_1893.txt	./speech_doc/Cleveland_1893.doc
106	1894	1894-12-03 00:00:00	22	Message	./speech_text/Cleveland_1894.txt	./speech_doc/Cleveland_1894.doc
107	1895	1895-12-02 00:00:00	22	Message	./speech_text/Cleveland_1895.txt	./speech_doc/Cleveland_1895.doc
108	1896	1896-12-07 00:00:00	22	Message	./speech_text/Cleveland_1896.txt	./speech_doc/Cleveland_1896.doc
109	1897	1897-12-06 00:00:00	24	Message	./speech_text/McKinley_1897.txt	./speech_doc/McKinley_1897.doc
110	1898	1898-12-05 00:00:00	24	Message	./speech_text/McKinley_1898.txt	./speech_doc/McKinley_1898.doc
111	1899	1899-12-05 00:00:00	24	Message	./speech_text/McKinley_1899.txt	./speech_doc/McKinley_1899.doc
112	1900	1900-12-03 00:00:00	24	Message	./speech_text/McKinley_1900.txt	./speech_doc/McKinley_1900.doc
113	1901	1901-12-03 00:00:00	25	Message	./speech_text/Roosevelt_1901.txt	./speech_doc/Roosevelt_1901.doc
114	1902	1902-12-02 00:00:00	25	Message	./speech_text/Roosevelt_1902.txt	./speech_doc/Roosevelt_1902.doc
115	1903	1903-12-07 00:00:00	25	Message	./speech_text/Roosevelt_1903.txt	./speech_doc/Roosevelt_1903.doc
116	1904	1904-12-06 00:00:00	25	Message	./speech_text/Roosevelt_1904.txt	./speech_doc/Roosevelt_1904.doc
117	1905	1905-12-05 00:00:00	25	Message	./speech_text/Roosevelt_1905.txt	./speech_doc/Roosevelt_1905.doc
118	1906	1906-12-03 00:00:00	25	Message	./speech_text/Roosevelt_1906.txt	./speech_doc/Roosevelt_1906.doc
119	1907	1907-12-03 00:00:00	25	Message	./speech_text/Roosevelt_1907.txt	./speech_doc/Roosevelt_1907.doc
120	1908	1908-12-08 00:00:00	25	Message	./speech_text/Roosevelt_1908.txt	./speech_doc/Roosevelt_1908.doc
121	1909	1909-12-07 00:00:00	26	Message	./speech_text/Taft_1909.txt	./speech_doc/Taft_1909.doc
122	1910	1910-12-06 00:00:00	26	Message	./speech_text/Taft_1910.txt	./speech_doc/Taft_1910.doc
123	1911	1911-12-05 00:00:00	26	Message	./speech_text/Taft_1911.txt	./speech_doc/Taft_1911.doc
124	1912	1912-12-03 00:00:00	26	Message	./speech_text/Taft_1912.txt	./speech_doc/Taft_1912.doc
125	1913	1913-12-02 00:00:00	27	Message	./speech_text/Wilson_1913.txt	./speech_doc/Wilson_1913.doc
126	1914	1914-12-08 00:00:00	27	Message	./speech_text/Wilson_1914.txt	./speech_doc/Wilson_1914.doc
127	1915	1915-12-07 00:00:00	27	Message	./speech_text/Wilson_1915.txt	./speech_doc/Wilson_1915.doc
128	1916	1916-12-05 00:00:00	27	Message	./speech_text/Wilson_1916.txt	./speech_doc/Wilson_1916.doc
129	1917	1917-12-04 00:00:00	27	Message	./speech_text/Wilson_1917.txt	./speech_doc/Wilson_1917.doc
130	1918	1918-12-02 00:00:00	27	Message	./speech_text/Wilson_1918.txt	./speech_doc/Wilson_1918.doc
131	1919	1919-12-02 00:00:00	27	Message	./speech_text/Wilson_1919.txt	./speech_doc/Wilson_1919.doc
132	1920	1920-12-07 00:00:00	27	Message	./speech_text/Wilson_1920.txt	./speech_doc/Wilson_1920.doc
133	1921	1921-12-06 00:00:00	28	Message	./speech_text/Harding_1921.txt	./speech_doc/Harding_1921.doc
134	1922	1922-12-08 00:00:00	28	Message	./speech_text/Harding_1922.txt	./speech_doc/Harding_1922.doc
135	1923	1923-12-06 00:00:00	29	Message	./speech_text/Coolidge_1923.txt	./speech_doc/Coolidge_1923.doc
136	1924	1924-12-03 00:00:00	29	Message	./speech_text/Coolidge_1924.txt	./speech_doc/Coolidge_1924.doc
137	1925	1925-12-08 00:00:00	29	Message	./speech_text/Coolidge_1925.txt	./speech_doc/Coolidge_1925.doc
138	1926	1926-12-07 00:00:00	29	Message	./speech_text/Coolidge_1926.txt	./speech_doc/Coolidge_1926.doc
139	1927	1927-12-06 00:00:00	29	Message	./speech_text/Coolidge_1927.txt	./speech_doc/Coolidge_1927.doc
140	1928	1928-12-04 00:00:00	29	Message	./speech_text/Coolidge_1928.txt	./speech_doc/Coolidge_1928.doc
141	1929	1929-12-03 00:00:00	30	Message	./speech_text/Hoover_1929.txt	./speech_doc/Hoover_1929.doc
142	1930	1930-12-02 00:00:00	30	Message	./speech_text/Hoover_1930.txt	./speech_doc/Hoover_1930.doc
143	1931	1931-12-08 00:00:00	30	Message	./speech_text/Hoover_1931.txt	./speech_doc/Hoover_1931.doc
144	1932	1932-12-06 00:00:00	30	Message	./speech_text/Hoover_1932.txt	./speech_doc/Hoover_1932.doc
145	1934	1934-01-03 00:00:00	31	Message	./speech_text/FDRoosevelt_1934.txt	./speech_doc/FDRoosevelt_1934.doc
146	1935	1935-01-04 00:00:00	31	Message	./speech_text/FDRoosevelt_1935.txt	./speech_doc/FDRoosevelt_1935.doc
147	1936	1936-01-03 00:00:00	31	Message	./speech_text/FDRoosevelt_1936.txt	./speech_doc/FDRoosevelt_1936.doc
148	1937	1937-01-06 00:00:00	31	Message	./speech_text/FDRoosevelt_1937.txt	./speech_doc/FDRoosevelt_1937.doc
149	1938	1938-01-03 00:00:00	31	Message	./speech_text/FDRoosevelt_1938.txt	./speech_doc/FDRoosevelt_1938.doc
150	1939	1939-01-04 00:00:00	31	Message	./speech_text/FDRoosevelt_1939.txt	./speech_doc/FDRoosevelt_1939.doc
151	1940	1940-01-03 00:00:00	31	Message	./speech_text/FDRoosevelt_1940.txt	./speech_doc/FDRoosevelt_1940.doc
152	1941	1941-01-06 00:00:00	31	Message	./speech_text/FDRoosevelt_1941.txt	./speech_doc/FDRoosevelt_1941.doc
153	1942	1942-01-06 00:00:00	31	Address	./speech_text/FDRoosevelt_1942.txt	./speech_doc/FDRoosevelt_1942.doc
154	1943	1943-01-07 00:00:00	31	Address	./speech_text/FDRoosevelt_1943.txt	./speech_doc/FDRoosevelt_1943.doc
155	1944	1944-01-11 00:00:00	31	Message	./speech_text/FDRoosevelt_1944.txt	./speech_doc/FDRoosevelt_1944.doc
156	1947	1947-01-06 00:00:00	32	Message	./speech_text/Truman_1947.txt	./speech_doc/Truman_1947.doc
157	1948	1948-01-07 00:00:00	32	Message	./speech_text/Truman_1948.txt	./speech_doc/Truman_1948.doc
158	1949	1949-01-05 00:00:00	32	Message	./speech_text/Truman_1949.txt	./speech_doc/Truman_1949.doc
159	1950	1950-01-04 00:00:00	32	Message	./speech_text/Truman_1950.txt	./speech_doc/Truman_1950.doc
160	1951	1951-01-08 00:00:00	32	Message	./speech_text/Truman_1951.txt	./speech_doc/Truman_1951.doc
161	1952	1952-01-09 00:00:00	32	Message	./speech_text/Truman_1952.txt	./speech_doc/Truman_1952.doc
162	1953	1953-01-07 00:00:00	32	Message	./speech_text/Truman_1953.txt	./speech_doc/Truman_1953.doc
163	1953	1953-02-02 00:00:00	33	Message	./speech_text/Eisenhower_1953.txt	./speech_doc/Eisenhower_1953.doc
164	1954	1954-01-07 00:00:00	33	Message	./speech_text/Eisenhower_1954.txt	./speech_doc/Eisenhower_1954.doc
165	1955	1955-01-06 00:00:00	33	Message	./speech_text/Eisenhower_1955.txt	./speech_doc/Eisenhower_1955.doc
166	1956	1956-01-05 00:00:00	33	Message	./speech_text/Eisenhower_1956.txt	./speech_doc/Eisenhower_1956.doc
167	1957	1957-01-10 00:00:00	33	Message	./speech_text/Eisenhower_1957.txt	./speech_doc/Eisenhower_1957.doc
168	1958	1958-01-09 00:00:00	33	Message	./speech_text/Eisenhower_1958.txt	./speech_doc/Eisenhower_1958.doc
169	1959	1959-01-09 00:00:00	33	Message	./speech_text/Eisenhower_1959.txt	./speech_doc/Eisenhower_1959.doc
170	1960	1960-01-07 00:00:00	33	Message	./speech_text/Eisenhower_1960.txt	./speech_doc/Eisenhower_1960.doc
171	1961	1961-01-12 00:00:00	33	Message	./speech_text/Eisenhower_1961.txt	./speech_doc/Eisenhower_1961.doc
172	1961	1961-01-30 00:00:00	34	Message	./speech_text/Kennedy_1961.txt	./speech_doc/Kennedy_1961.doc
173	1962	1962-01-11 00:00:00	34	Message	./speech_text/Kennedy_1962.txt	./speech_doc/Kennedy_1962.doc
174	1963	1963-01-14 00:00:00	34	Message	./speech_text/Kennedy_1963.txt	./speech_doc/Kennedy_1963.doc
175	1964	1964-01-08 00:00:00	35	Message	./speech_text/LBJohnson_1964.txt	./speech_doc/LBJohnson_1964.doc
176	1965	1965-01-04 00:00:00	35	Message	./speech_text/LBJohnson_1965.txt	./speech_doc/LBJohnson_1965.doc
177	1966	1966-01-12 00:00:00	35	Message	./speech_text/LBJohnson_1966.txt	./speech_doc/LBJohnson_1966.doc
178	1967	1967-01-10 00:00:00	35	Message	./speech_text/LBJohnson_1967.txt	./speech_doc/LBJohnson_1967.doc
179	1968	1968-01-17 00:00:00	35	Message	./speech_text/LBJohnson_1968.txt	./speech_doc/LBJohnson_1968.doc
180	1969	1969-01-14 00:00:00	35	Message	./speech_text/LBJohnson_1969.txt	./speech_doc/LBJohnson_1969.doc
181	1970	1970-01-22 00:00:00	36	Message	./speech_text/Nixon_1970.txt	./speech_doc/Nixon_1970.doc
182	1971	1971-01-22 00:00:00	36	Message	./speech_text/Nixon_1971.txt	./speech_doc/Nixon_1971.doc
183	1972	1972-01-20 00:00:00	36	Message	./speech_text/Nixon_1972.txt	./speech_doc/Nixon_1972.doc
184	1972	1972-01-20 00:00:00	36	Address	./speech_text/Nixon_1972.txt	./speech_doc/Nixon_1972.doc
185	1974	1974-01-30 00:00:00	36	Message	./speech_text/Nixon_1974.txt	./speech_doc/Nixon_1974.doc
186	1974	1974-01-30 00:00:00	36	Address	./speech_text/Nixon_1974.txt	./speech_doc/Nixon_1974.doc
187	1975	1975-01-15 00:00:00	37	Address	./speech_text/Ford_1975.txt	./speech_doc/Ford_1975.doc
188	1976	1976-01-19 00:00:00	37	Address	./speech_text/Ford_1976.txt	./speech_doc/Ford_1976.doc
189	1977	1977-01-12 00:00:00	37	Address 	./speech_text/Ford_1977.txt	./speech_doc/Ford_1977.doc
190	1978	1978-01-19 00:00:00	38	Message	./speech_text/Carter_1978.txt	./speech_doc/Carter_1978.doc
191	1978	1978-01-19 00:00:00	38	Address	./speech_text/Carter_1978.txt	./speech_doc/Carter_1978.doc
192	1979	1979-01-23 00:00:00	38	Address	./speech_text/Carter_1979.txt	./speech_doc/Carter_1979.doc
193	1979	1979-01-25 00:00:00	38	Message	./speech_text/Carter_1979.txt	./speech_doc/Carter_1979.doc
194	1980	1980-01-21 00:00:00	38	Message	./speech_text/Carter_1980.txt	./speech_doc/Carter_1980.doc
195	1980	1980-01-23 00:00:00	38	Address	./speech_text/Carter_1980.txt	./speech_doc/Carter_1980.doc
196	1981	1981-01-16 00:00:00	38	Message	./speech_text/Carter_1981.txt	./speech_doc/Carter_1981.doc
197	1982	1982-01-26 00:00:00	39	Address	./speech_text/Reagan_1982.txt	./speech_doc/Reagan_1982.doc
198	1983	1983-01-25 00:00:00	39	Address	./speech_text/Reagan_1983.txt	./speech_doc/Reagan_1983.doc
199	1984	1984-01-25 00:00:00	39	Address	./speech_text/Reagan_1984.txt	./speech_doc/Reagan_1984.doc
200	1985	1985-02-06 00:00:00	39	Address	./speech_text/Reagan_1985.txt	./speech_doc/Reagan_1985.doc
201	1986	1986-02-04 00:00:00	39	Address	./speech_text/Reagan_1986.txt	./speech_doc/Reagan_1986.doc
202	1987	1987-01-27 00:00:00	39	Address	./speech_text/Reagan_1987.txt	./speech_doc/Reagan_1987.doc
203	1988	1988-01-25 00:00:00	39	Address	./speech_text/Reagan_1988.txt	./speech_doc/Reagan_1988.doc
204	1990	1990-01-31 00:00:00	40	Address	./speech_text/HWBush_1990.txt	./speech_doc/HWBush_1990.doc
205	1991	1991-01-29 00:00:00	40	Address	./speech_text/HWBush_1991.txt	./speech_doc/HWBush_1991.doc
206	1992	1992-01-28 00:00:00	40	Address	./speech_text/HWBush_1992.txt	./speech_doc/HWBush_1992.doc
207	1994	1994-01-25 00:00:00	41	Address	./speech_text/Clinton_1994.txt	./speech_doc/Clinton_1994.doc
208	1995	1995-01-24 00:00:00	41	Address	./speech_text/Clinton_1995.txt	./speech_doc/Clinton_1995.doc
209	1996	1996-01-23 00:00:00	41	Address	./speech_text/Clinton_1996.txt	./speech_doc/Clinton_1996.doc
210	1997	1997-02-04 00:00:00	41	Address	./speech_text/Clinton_1997.txt	./speech_doc/Clinton_1997.doc
211	1998	1998-01-27 00:00:00	41	Address	./speech_text/Clinton_1998.txt	./speech_doc/Clinton_1998.doc
212	1999	1999-01-19 00:00:00	41	Address	./speech_text/Clinton_1999.txt	./speech_doc/Clinton_1999.doc
213	2000	2000-01-27 00:00:00	41	Address	./speech_text/Clinton_2000.txt	./speech_doc/Clinton_2000.doc
214	2002	2002-01-29 00:00:00	42	Address	./speech_text/Bush_2002.txt	./speech_doc/Bush_2002.doc
215	2003	2003-01-28 00:00:00	42	Address	./speech_text/Bush_2003.txt	./speech_doc/Bush_2003.doc
216	2004	2004-01-20 00:00:00	42	Address	./speech_text/Bush_2004.txt	./speech_doc/Bush_2004.doc
217	2005	2005-02-02 00:00:00	42	Address	./speech_text/Bush_2005.txt	./speech_doc/Bush_2005.doc
218	2006	2006-01-31 00:00:00	42	Address	./speech_text/Bush_2006.txt	./speech_doc/Bush_2006.doc
219	2007	2007-01-23 00:00:00	42	Address	./speech_text/Bush_2007.txt	./speech_doc/Bush_2007.doc
220	2008	2008-01-28 00:00:00	42	Address	./speech_text/Bush_2008.txt	./speech_doc/Bush_2008.doc
221	2010	2010-01-27 00:00:00	43	Address	./speech_text/Obama_2010.txt	./speech_doc/Obama_2010.doc
222	2011	2011-01-25 00:00:00	43	Address	./speech_text/Obama_2011.txt	./speech_doc/Obama_2011.doc
223	2012	2012-01-24 00:00:00	43	Address	./speech_text/Obama_2012.txt	./speech_doc/Obama_2012.doc
224	2013	2013-02-12 00:00:00	43	Address	./speech_text/Obama_2013.txt	./speech_doc/Obama_2013.doc
225	2014	2014-01-28 00:00:00	43	Address	./speech_text/Obama_2014.txt	./speech_doc/Obama_2014.doc
226	2015	2015-01-20 00:00:00	43	Address	./speech_text/Obama_2015.txt	./speech_doc/Obama_2015.doc
227	2016	2016-01-12 00:00:00	43	Address	./speech_text/Obama_2016.txt	./speech_doc/Obama_2016.doc
228	2018	2018-01-30 00:00:00	44	Address	./speech_text/Trump_2018.txt	./speech_doc/Trump_2018.doc
229	2019	2019-02-05 00:00:00	44	Address	./speech_text/Trump_2019.txt	./speech_doc/Trump_2019.doc
\.


--
-- Data for Name: years; Type: TABLE DATA; Schema: public; Owner: madelainebolton
--

COPY public.years (year, pres_id) FROM stdin;
1790	1
1791	1
1792	1
1793	1
1794	1
1795	1
1796	1
1797	2
1798	2
1799	2
1800	2
1801	3
1802	3
1803	3
1804	3
1805	3
1806	3
1807	3
1808	3
1809	4
1810	4
1811	4
1812	4
1813	4
1814	4
1815	4
1816	4
1817	5
1818	5
1819	5
1820	5
1821	5
1822	5
1823	5
1824	5
1825	6
1826	6
1827	6
1828	6
1829	7
1830	7
1831	7
1832	7
1833	7
1834	7
1835	7
1836	7
1837	8
1838	8
1839	8
1840	8
1841	10
1842	10
1843	10
1844	10
1845	11
1846	11
1847	11
1848	11
1849	12
1850	13
1851	13
1852	13
1853	14
1854	14
1855	14
1856	14
1857	15
1858	15
1859	15
1860	15
1861	16
1862	16
1863	16
1864	16
1865	17
1866	17
1867	17
1868	17
1869	18
1870	18
1871	18
1872	18
1873	18
1874	18
1875	18
1876	18
1877	19
1878	19
1879	19
1880	19
1881	21
1882	21
1883	21
1884	21
1885	22
1886	22
1887	22
1888	22
1889	23
1890	23
1891	23
1892	23
1893	22
1894	22
1895	22
1896	22
1897	24
1898	24
1899	24
1900	24
1901	25
1902	25
1903	25
1904	25
1905	25
1906	25
1907	25
1908	25
1909	26
1910	26
1911	26
1912	26
1913	27
1914	27
1915	27
1916	27
1917	27
1918	27
1919	27
1920	27
1921	28
1922	28
1923	29
1924	29
1925	29
1926	29
1927	29
1928	29
1929	30
1930	30
1931	30
1932	30
1934	31
1935	31
1936	31
1937	31
1938	31
1939	31
1940	31
1941	31
1942	31
1943	31
1944	31
1947	32
1948	32
1949	32
1950	32
1951	32
1952	32
1953	32
1954	33
1955	33
1956	33
1957	33
1958	33
1959	33
1960	33
1961	33
1962	34
1963	34
1964	35
1965	35
1966	35
1967	35
1968	35
1969	35
1970	36
1971	36
1972	36
1974	36
1975	37
1976	37
1977	37
1978	38
1979	38
1980	38
1981	38
1982	39
1983	39
1984	39
1985	39
1986	39
1987	39
1988	39
1990	40
1991	40
1992	40
1994	41
1995	41
1996	41
1997	41
1998	41
1999	41
2000	41
2002	42
2003	42
2004	42
2005	42
2006	42
2007	42
2008	42
2010	43
2011	43
2012	43
2013	43
2014	43
2015	43
2016	43
2018	44
2019	44
\.


--
-- Name: presidents_pres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: madelainebolton
--

SELECT pg_catalog.setval('public.presidents_pres_id_seq', 44, true);


--
-- Name: speeches_speech_id_seq; Type: SEQUENCE SET; Schema: public; Owner: madelainebolton
--

SELECT pg_catalog.setval('public.speeches_speech_id_seq', 229, true);


--
-- Name: presidents presidents_pkey; Type: CONSTRAINT; Schema: public; Owner: madelainebolton
--

ALTER TABLE ONLY public.presidents
    ADD CONSTRAINT presidents_pkey PRIMARY KEY (pres_id);


--
-- Name: speeches speeches_pkey; Type: CONSTRAINT; Schema: public; Owner: madelainebolton
--

ALTER TABLE ONLY public.speeches
    ADD CONSTRAINT speeches_pkey PRIMARY KEY (speech_id);


--
-- Name: years years_pkey; Type: CONSTRAINT; Schema: public; Owner: madelainebolton
--

ALTER TABLE ONLY public.years
    ADD CONSTRAINT years_pkey PRIMARY KEY (year);


--
-- Name: speeches speeches_pres_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: madelainebolton
--

ALTER TABLE ONLY public.speeches
    ADD CONSTRAINT speeches_pres_id_fkey FOREIGN KEY (pres_id) REFERENCES public.presidents(pres_id);


--
-- Name: speeches speeches_year_fkey; Type: FK CONSTRAINT; Schema: public; Owner: madelainebolton
--

ALTER TABLE ONLY public.speeches
    ADD CONSTRAINT speeches_year_fkey FOREIGN KEY (year) REFERENCES public.years(year);


--
-- Name: years years_pres_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: madelainebolton
--

ALTER TABLE ONLY public.years
    ADD CONSTRAINT years_pres_id_fkey FOREIGN KEY (pres_id) REFERENCES public.presidents(pres_id);


--
-- PostgreSQL database dump complete
--

