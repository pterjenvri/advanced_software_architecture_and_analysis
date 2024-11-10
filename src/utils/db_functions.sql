CREATE OR REPLACE FUNCTION calculate_difference()
RETURNS TRIGGER AS $$
BEGIN
	UPDATE logs SET elapsed_time = (message_received - message_sent);
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER calculate_difference_trigger
AFTER INSERT OR UPDATE OF message_received ON logs
FOR EACH ROW
EXECUTE FUNCTION calculate_difference();