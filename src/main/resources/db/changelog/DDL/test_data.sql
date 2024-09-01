INSERT INTO filter (filter_id, name) VALUES (1, 'amountFilter');
INSERT INTO filter (filter_id, name) VALUES (2, 'titleFilter');
INSERT INTO filter (filter_id, name) VALUES (3, 'mixedFilter');

INSERT INTO criteria (criteria_id, type, comparator, amount_value, filter_id) VALUES (1, 'AMOUNT', 'LESS_THAN', 8, 1);
INSERT INTO criteria (criteria_id, type, comparator, title_value, filter_id) VALUES (2, 'TITLE', 'STARTS_WITH', 'test', 2);
INSERT INTO criteria (criteria_id, type, comparator, title_value, filter_id) VALUES (3, 'TITLE', 'CONTAINS', 'phrase', 3);
INSERT INTO criteria (criteria_id, type, comparator, date_value, filter_id) VALUES (4, 'DATE', 'FROM', '2024-05-08', 3);

select setval(pg_get_serial_sequence('filter', 'filter_id'), (select max(filter_id) from filter));
select setval(pg_get_serial_sequence('criteria', 'criteria_id'), (select max(criteria_id) from criteria));
