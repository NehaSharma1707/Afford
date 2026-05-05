# Stage 1: API Design

* REST APIs for notification system
* Endpoints: create, fetch, read, delete, bulk
* Real-time: WebSockets

---

# Stage 2: Database

* DB: PostgreSQL
* Table: notifications

```sql
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT,
    message TEXT,
    notification_type VARCHAR(20),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Stage 3: Optimization

Problem: slow query

Fix:

```sql
CREATE INDEX idx_student_read_created
ON notifications (studentID, isRead, createdAt);
```

---

# Stage 4: Performance

* Redis caching
* Pagination
* WebSockets
* Read replicas

---

# Stage 5: Reliable Notification System

## Problems

* No retry
* Tight coupling
* Email failure → lost notifications

## Solution

* Save to DB first
* Use Queue
* Worker handles email

### Pseudocode

```python
function notify(student_id, message):
    id = save_to_db(student_id, message)
    queue.publish({id, student_id, message})
```

```python
function worker():
    job = queue.consume()
    try:
        send_email(job.student_id)
    except:
        retry(job)
```

---

# Stage 6: Priority Inbox

* Placement > Result > Event
* Latest first
* Use sorting / heap

Score:

```
score = weight + timestamp
```

Efficient:

* Maintain top 10 heap

---

# Additional Notes

## Logging

* Custom logger used everywhere
* No console.log used

## Authentication

* Not implemented (as instructed)
