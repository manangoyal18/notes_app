-- Sample data for Notes App (H2 Database)
INSERT INTO notes (title, content, created_at, updated_at, version) VALUES 
('Shopping List', 'Milk, Eggs, Bread, Butter', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
('Meeting Notes', 'Discussed project timeline and deliverables. Next meeting scheduled for Friday.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
('Recipe Ideas', 'Pasta with marinara sauce, Grilled chicken with vegetables, Caesar salad', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
('Book Recommendations', '1. Clean Code by Robert Martin\n2. Design Patterns by Gang of Four\n3. Spring in Action', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);