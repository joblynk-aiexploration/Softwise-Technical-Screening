# Memory Protocol – Main Agent

Primary persistence lives in Postgres `agent_memory_hub` so instructions/tasks survive restarts.

- **Database URL:** postgresql://postgres:AIzaSyC69gwKzgTO9@127.0.0.1:5432/agent_memory_hub
- **Table:** public.agent_memories
- Use `agent_name = 'main'` for system-level notes (plans, open tasks, org changes).
- Capture critical context with:
  ```sql
  insert into public.agent_memories (agent_name, context, tags)
  values ('main', 'summary of decision / outstanding work', ARRAY['org','plan']);
  ```
- On session start, reload latest entries:
  ```sql
  select context, tags, created_at
  from public.agent_memories
  where agent_name = 'main'
  order by created_at desc
  limit 50;
  ```
