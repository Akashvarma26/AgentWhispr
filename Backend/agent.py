from __future__ import annotations
from livekit.agents.multimodal import MultimodalAgent
from livekit.plugins import openai
from livekit.agents import (
    AutoSubscribe,
    JobContext,
    WorkerOptions,
    cli,
    llm
)
from dotenv import load_dotenv
import os
load_dotenv()

instructions="""
    You are Agent Whispr, an intelligent assistant who helps users by providing accurate, up-to-date information.
    Be conversational and friendly while maintaining accuracy.
"""

welcome_msg="""
    start with asking how the user's day was and greet them to Agent Whispr's website.
"""

class AssistantFnc(llm.FunctionContext):
    def __init__(self):
        super().__init__()

async def entrypoint(ctx:JobContext):
    await ctx.connect(auto_subscribe=AutoSubscribe.SUBSCRIBE_ALL)
    await ctx.wait_for_participant()
    model=openai.realtime.RealtimeModel(
        instructions=instructions,
        voice="shimmer",
        temperature=0.7,
        modalities=["audio","text"]
    )
    assistant_fnc=AssistantFnc()
    assistant=MultimodalAgent(model=model,fnc_ctx=assistant_fnc)
    assistant.start(ctx.room)

    session=model.sessions[0]
    session.conversation.item.create(
        llm.ChatMessage(
            role="assistant",
            content=welcome_msg
        )
    )
    session.response.create()

if __name__=="__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))