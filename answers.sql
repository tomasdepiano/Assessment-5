-- Question 1: 
SELECT email FROM customers ORDER BY email ASC;

-- Question 2: 
SELECT id FROM orders WHERE customer_id IN ( SELECT id FROM customers WHERE fname = 'Elizabeth' AND lname = 'Crocker');

-- Question 3:
SELECT SUM(num_cupcakes) AS sum FROM orders WHERE processed = FALSE;