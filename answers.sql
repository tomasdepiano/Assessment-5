-- Question 1: 
SELECT email FROM customers ORDER BY email ASC;

-- Question 2: 
SELECT id FROM orders WHERE customer_id IN ( SELECT id FROM customers WHERE fname = 'Elizabeth' AND lname = 'Crocker');

-- Question 3:
SELECT SUM(num_cupcakes) AS sum FROM orders WHERE processed = FALSE;

-- Question 4:
SELECT name,SUM(num_cupcakes) FROM cupcakes LEFT JOIN orders ON cupcakes.id = orders.cupcake_id GROUP BY name ORDER BY name ASC; 

-- Question 5: