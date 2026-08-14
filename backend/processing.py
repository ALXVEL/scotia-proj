import logging

from .data_fetch import SourceData
from .models.response_models import SummaryResponse, TopCommentedPostResponse, UserActivityResponse

logger = logging.getLogger("backend")

def build_summary(data: SourceData) -> SummaryResponse:

    completed_todos = 0
    pending_todos = 0
    for todo in data.todos:
        if todo.completed: # assuming completed == true
            completed_todos += 1
        else: # assuming completed == false
            pending_todos += 1

    logger.info("Computed summary over %d users", len(data.users))

    return SummaryResponse(
        total_users=len(data.users),
        total_posts=len(data.posts),
        total_comments=len(data.comments),
        total_todos=len(data.todos),
        completed_todos=completed_todos,
        pending_todos=pending_todos,
    )

def build_users_activity(data: SourceData) -> list[UserActivityResponse]:

    # our list of UserActivityResponse objects
    results = []

    for user in data.users:
        user_posts = []
        comment_count = 0
        todos_count = 0
        completed_todos_count = 0
        completed_todos_rate = 0.0

        # gathering all the user posts by user id
        for post in data.posts:
            if post.userId == user.id:
                user_posts.append(post)
        
        # gathering all the comments in user posts
        # ASSUMPTION: the assignment asks for 'comment count', 
        # it is safe to assume it means a sum of all comments in user posts
        # because there is no reliable way to link a userId to a comment, 
        # we cannot use 'email' as string to form relationship
        
        # STEP 1: grab all the post ids from user_posts
        user_post_ids = set()
        for post in user_posts:
            user_post_ids.add(post.id)
        
        # STEP 2: count how many comments are in user_post_ids
        for comment in data.comments:
            if comment.postId in user_post_ids:
                comment_count += 1

        # count todos
        for todo in data.todos:
            if todo.userId == user.id:
                todos_count += 1
                if todo.completed:
                    completed_todos_count += 1

        if todos_count:
            completed_todos_rate = completed_todos_count / todos_count
        else:
            completed_todos_rate = 0.0

        results.append(
            UserActivityResponse(
                user_id=user.id,
                name=user.name,
                post_count=len(user_posts),
                comment_count=comment_count,
                todo_count=todos_count,
                completion_rate=completed_todos_rate,
            )
        )

    logger.info("Computed activity for %d users", len(results))

    return results

def build_top_commented_posts(data: SourceData, limit: int) -> list[TopCommentedPostResponse]:
    
    result = []

    # post_id --> how many comments the post has
    posts_comment_counts: dict[int, int] = {}
    
    for comment in data.comments:
        posts_comment_counts[comment.postId] = posts_comment_counts.get(comment.postId, 0) + 1

    # grab top n posts
    sorted_posts = sorted(
        data.posts,
        key=lambda post: posts_comment_counts.get(post.id, 0),
        reverse=True,
    )[:limit]

    logger.info("Computed top %d commented posts", len(sorted_posts))

    # prepare the result
    for post in sorted_posts:
        result.append(
            TopCommentedPostResponse(
                post_id=post.id,
                title=post.title,
                comment_count=posts_comment_counts.get(post.id, 0)
            )
        )

    return result
