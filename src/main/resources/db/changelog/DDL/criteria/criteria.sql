CREATE TABLE criteria
(
    criteria_id                 SERIAL PRIMARY KEY NOT NULL,
    filter_id                   INT NOT NULL,
    type                        VARCHAR(100) NOT NULL,
    comparator                  VARCHAR(100) NOT NULL,
    date_value                  TIMESTAMP(3) NULL,
    amount_value                INT NULL,
    title_value                 VARCHAR(250) NULL,
    CONSTRAINT FK_CRITERIA_FILTER FOREIGN KEY (filter_id) REFERENCES filter(filter_id)
);