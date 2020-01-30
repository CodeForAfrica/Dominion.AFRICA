--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;

ALTER TABLE IF EXISTS ONLY public.sources DROP CONSTRAINT IF EXISTS pk_sources;
DROP TABLE IF EXISTS public.sources;
SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: sources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sources (
    geo_level character varying(15) NOT NULL,
    country_code character varying(10) NOT NULL,
    table_name character varying(50) NOT NULL,
    source_title character varying(200) NOT NULL,
    source_link character varying(250) NOT NULL
);


--
-- Data for Name: sources; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sources (geo_level, country_code, table_name, source_title, source_link) FROM stdin;
country	ZA	allPopulationResidence2009S	Census, 2009	https://s3-eu-west-1.amazonaws.com/s3.sourceafrica.net/documents/21195/Census-2009.pdf
country	ZA	allPopulationGroup2016S	Community Survey, 2016	http://cs2016.statssa.gov.za/wp-content/uploads/2016/07/NT-30-06-2016-RELEASE-for-CS-2016-_Statistical-releas_1-July-2016.pdf
country	ZA	allWazimapGeographies	Municipal Demarcation Board	https://africaopendata.org/dataset/municipal-demarcation-board-national-boundary-data
country	ZA	allWorkersHostelAgeGroups	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
country	ZA	allWorkersHostelGenders	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
country	ZA	allWorkersHostelGeographies	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
country	ZA	allWorkersHostelHandwashingFacilities	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
country	ZA	allWorkersHostelOwnerships	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
country	ZA	allWorkersHostelPopulations	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
country	ZA	allWorkersHostelPopulationGroups	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
country	ZA	allWorkersHostelRents	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
country	ZA	allWorkersHostelResidentialOwnerships	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
country	ZA	allWorkersHostelSsDwellings	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
country	ZA	allWorkersHostelAccessElectricities	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
country	ZA	allWorkersHostelWaterSources	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
country	ZA	allNumberoflandownerspergenders	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allNumberoflandownerspernationalities	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allNumberoflandownersperraces	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allNumberofprivatelandownersbycategories	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allPrivatelandownershipinhectarespercategories	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allLandownershipinhectaresbyraces	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allLandownershipinhectaresbygenders	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allLandownershipinhectaresbynationalities	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allErvenLandOwnershipInHectaresByGenders	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allNumberOfErvenLandOwnersPerGenders	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allNumberOfErvenLandOwnersPerNationalities	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allErvenLandOwnershipInHectaresByNationalities	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allErvenLandOwnershipInHectaresByRaces	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allNumberOfErvenLandOwnersPerRaces	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allNumberofsectionaltitleownersbycategories	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allSectionaltitleownershipinhectarespercategories	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allSectionaltitleownershipinhectaresperraces	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allNumberofsectionaltitleownersbyraces	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allSectionaltitleownershipinhectarespergenders	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allNumberofsectionaltitleownersbygenders	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allSectionaltitleownershipinhectaresnationalities	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allNumberofsectionaltitleownersbynationalities	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
country	ZA	allNumTransactionsTradedPerClass2018S	AGRIDS, 2019	http://land.agrids.co.za/
country	ZA	allTotalHectaresTradedPerClass2018S	AGRIDS, 2019	http://land.agrids.co.za/
country	ZA	allAvgPricePerHectaresPerClass2018S	AGRIDS, 2019	http://land.agrids.co.za/
country	ZA	allHighestPriceTradedPerClass2018S	AGRIDS, 2019	http://land.agrids.co.za/
country	ZA	allLowestPriceTradedPerClass2018S	AGRIDS, 2019	http://land.agrids.co.za/
country	ZA	allPriceTrendsTradedPerClass2018S	AGRIDS, 2019	http://land.agrids.co.za/
country	ZA	allLandTradedColourTransactions2018S	AGRIDS, 2019	http://land.agrids.co.za/
country	ZA	allLandTradedColourCostBreakdown2018S	AGRIDS, 2019	http://land.agrids.co.za/
country	ZA	allLandTradedAllVsColour2018S	AGRIDS, 2019	http://land.agrids.co.za/
country	ZA	allLandTradedColourHectaresBreakdown2018S	AGRIDS, 2019	http://land.agrids.co.za/
country	ZA	allHectaresTransferredPerProvinceByYears	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allRedistributedlandnumhectares	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allRedistributedlandcostinrands	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allRedistributedlandinhectares	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allRedistributedlandusebreakdowns	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allProjecttransferreds	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allBenefitedbeneficiaries	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allBenefitedhouseholds	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allFemalepartybenefiteds	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allDisabledpeoplepartybenefiteds	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allYouthpartybenefiteds	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allRestitutionhectaresacquireds	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allRestitutionhouseholds	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allRestitutionbeneficiaries	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allRestitutionfemaleheadedhhs	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allRestitutionfinancialcompensations	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allRestitutionpeoplewdisabilities	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allRestitutionlandcosts	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
country	ZA	allLandToPrioritiseForRedistributions	Afrobarometer Round 7: Survey, 2018	http://afrobarometer.org/publications/south-africa-summary-results-2018
country	ZA	allAccessToInformations	Afrobarometer Round 7: Survey, 2018	http://afrobarometer.org/publications/south-africa-summary-results-2018
country	ZA	allMaintainWillingBuyerWillingSellerPolicies	Afrobarometer Round 7: Survey, 2018	http://afrobarometer.org/publications/south-africa-summary-results-2018
country	ZA	allAllowFarmersRetainLandOwnerships	Afrobarometer Round 7: Survey, 2018	http://afrobarometer.org/publications/south-africa-summary-results-2018
country	ZA	allLandAcquisationChallenges	Afrobarometer Round 7: Survey, 2018	http://afrobarometer.org/publications/south-africa-summary-results-2018
level1	ZA	allPopulationResidence2009S	Census, 2009	https://s3-eu-west-1.amazonaws.com/s3.sourceafrica.net/documents/21195/Census-2009.pdf
level1	ZA	allPopulationGroup2016S	Community Survey, 2016	http://cs2016.statssa.gov.za/wp-content/uploads/2016/07/NT-30-06-2016-RELEASE-for-CS-2016-_Statistical-releas_1-July-2016.pdf
level1	ZA	allWazimapGeographies	Municipal Demarcation Board	https://africaopendata.org/dataset/municipal-demarcation-board-national-boundary-data
level1	ZA	allWorkersHostelAgeGroups	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
level1	ZA	allWorkersHostelGenders	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
level1	ZA	allWorkersHostelGeographies	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
level1	ZA	allWorkersHostelHandwashingFacilities	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
level1	ZA	allWorkersHostelOwnerships	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
level1	ZA	allWorkersHostelPopulations	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
level1	ZA	allWorkersHostelPopulationGroups	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
level1	ZA	allWorkersHostelRents	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
level1	ZA	allWorkersHostelResidentialOwnerships	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
level1	ZA	allWorkersHostelSsDwellings	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
level1	ZA	allWorkersHostelAccessElectricities	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
level1	ZA	allWorkersHostelWaterSources	General Household Survey, 2018	http://www.statssa.gov.za/publications/P0318/P03182018.pdf
level1	ZA	allNumberoflandownerspergenders	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allNumberoflandownerspernationalities	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allNumberoflandownersperraces	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allNumberofprivatelandownersbycategories	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allPrivatelandownershipinhectarespercategories	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allLandownershipinhectaresbyraces	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allLandownershipinhectaresbygenders	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allLandownershipinhectaresbynationalities	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allErvenLandOwnershipInHectaresByGenders	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allNumberOfErvenLandOwnersPerGenders	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allNumberOfErvenLandOwnersPerNationalities	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allErvenLandOwnershipInHectaresByNationalities	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allErvenLandOwnershipInHectaresByRaces	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allNumberOfErvenLandOwnersPerRaces	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allNumberofsectionaltitleownersbycategories	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allSectionaltitleownershipinhectarespercategories	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allSectionaltitleownershipinhectaresperraces	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allNumberofsectionaltitleownersbyraces	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allSectionaltitleownershipinhectarespergenders	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allNumberofsectionaltitleownersbygenders	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allSectionaltitleownershipinhectaresnationalities	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allNumberofsectionaltitleownersbynationalities	Land Audit Report, 2017	http://www.ruraldevelopment.gov.za/publications/land-audit-report/file/6126
level1	ZA	allNumTransactionsTradedPerClass2018S	AGRIDS, 2019	http://land.agrids.co.za/
level1	ZA	allTotalHectaresTradedPerClass2018S	AGRIDS, 2019	http://land.agrids.co.za/
level1	ZA	allAvgPricePerHectaresPerClass2018S	AGRIDS, 2019	http://land.agrids.co.za/
level1	ZA	allHighestPriceTradedPerClass2018S	AGRIDS, 2019	http://land.agrids.co.za/
level1	ZA	allLowestPriceTradedPerClass2018S	AGRIDS, 2019	http://land.agrids.co.za/
level1	ZA	allPriceTrendsTradedPerClass2018S	AGRIDS, 2019	http://land.agrids.co.za/
level1	ZA	allLandTradedColourTransactions2018S	AGRIDS, 2019	http://land.agrids.co.za/
level1	ZA	allLandTradedColourCostBreakdown2018S	AGRIDS, 2019	http://land.agrids.co.za/
level1	ZA	allLandTradedAllVsColour2018S	AGRIDS, 2019	http://land.agrids.co.za/
level1	ZA	allLandTradedColourHectaresBreakdown2018S	AGRIDS, 2019	http://land.agrids.co.za/
level1	ZA	allHectaresTransferredPerProvinceByYears	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allRedistributedlandnumhectares	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allRedistributedlandcostinrands	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allRedistributedlandinhectares	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allRedistributedlandusebreakdowns	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allProjecttransferreds	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allBenefitedbeneficiaries	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allBenefitedhouseholds	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allFemalepartybenefiteds	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allDisabledpeoplepartybenefiteds	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allYouthpartybenefiteds	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allRestitutionhectaresacquireds	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allRestitutionhouseholds	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allRestitutionbeneficiaries	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allRestitutionfemaleheadedhhs	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allRestitutionfinancialcompensations	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allRestitutionpeoplewdisabilities	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allRestitutionlandcosts	Annual statistical report for selected service delivery programmes of the Department of Rural Development and Land Reform	https://africaopendata.org/dataset/redistribution-and-restitution-in-south-africa-2018/resource/487dcca4-e8ab-4aac-b7a0-9d00a9755f3a?view_id=dcc13ebb-e2e9-46b0-bbe3-505456027fae
level1	ZA	allLandToPrioritiseForRedistributions	Afrobarometer Round 7: Survey, 2018	http://afrobarometer.org/publications/south-africa-summary-results-2018
level1	ZA	allAccessToInformations	Afrobarometer Round 7: Survey, 2018	http://afrobarometer.org/publications/south-africa-summary-results-2018
level1	ZA	allMaintainWillingBuyerWillingSellerPolicies	Afrobarometer Round 7: Survey, 2018	http://afrobarometer.org/publications/south-africa-summary-results-2018
level1	ZA	allAllowFarmersRetainLandOwnerships	Afrobarometer Round 7: Survey, 2018	http://afrobarometer.org/publications/south-africa-summary-results-2018
level1	ZA	allLandAcquisationChallenges	Afrobarometer Round 7: Survey, 2018	http://afrobarometer.org/publications/south-africa-summary-results-2018
\.


--
-- Name: sources pk_sources; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sources
    ADD CONSTRAINT pk_sources PRIMARY KEY (geo_level, country_code, table_name);


--
-- PostgreSQL database dump complete
--

