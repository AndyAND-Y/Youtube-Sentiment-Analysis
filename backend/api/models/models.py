from .vader import get_vader_response
from .distibert import get_distibert_response

MODELS = {
    "vader": get_vader_response,
    "distibert": get_distibert_response,
    # "distibert": get_vader_response,
}
