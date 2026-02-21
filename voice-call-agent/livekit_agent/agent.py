"""Minimal LiveKit Cloud agent entrypoint.

This file exists to provide a valid Python agent project structure for
`lk agent deploy` language detection and packaging.

It can be expanded to wire full realtime voice logic later.
"""

from __future__ import annotations

from livekit.agents import Agent, AgentSession, JobContext, WorkerOptions, cli


class JoblynkScreeningAgent(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions=(
                "You are Joblynk's screening voice assistant. "
                "Keep responses concise, professional, and candidate-friendly."
            )
        )


async def entrypoint(ctx: JobContext) -> None:
    await ctx.connect()

    session = AgentSession()
    await session.start(agent=JoblynkScreeningAgent(), room=ctx.room)


if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
