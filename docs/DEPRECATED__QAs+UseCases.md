# Quality Attributes:
1. Availability
1. Modifiability
1. Integrability

# Use cases
Use case name: Deliver raw material  
Actors: Production manager  
Precondition: Raw material available  

### Steps:
1. The production manager puts the raw material into the warehouse
1. The production manager starts the production (pressing green button)
1. Warehouse 1 notifies AGV about having material to produce

Postconditions: The production will start

---

Use case name: Produce capsule A1  
Actors: Produce cell 1  
Preconditions: Raw material available on the magnetic track  

### Steps:
1. Production cell 1 collects the raw material from the magnetic track
1. Production cell 1 creates the capsule
1. Production cell 1 puts the capsule to the magnetic track

Postconditions: A capsule without medicine is on the magnetic track

---

Use case name: Produce capsule A2  
Actors: Production cell 2
Preconditions: Capsules without medicine and medicine raw material are available

### Steps:
1. Production cell 2 collects the materials
1. Production cell 2 fills the capsule with medicine
1. Production cell 2 puts the filled capsule to the magnetic track

Postconditions: A capsule filled with medicine is on the magnetic track