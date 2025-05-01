from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Load CSV with headers
df = pd.read_csv("stackoverflow_tags1.csv")

# Convert Published Date column to datetime and extract the year
df["Published Date"] = pd.to_datetime(df["Published Date"])
df["Year"] = df["Published Date"].dt.year

# Get the top 10 most common tags
top_tags = df["Tag"].value_counts().nlargest(10).index

@app.route('/api/tags', methods=['GET'])
def get_tags_by_year():
    """
    Returns the count of the top 10 tags grouped by year.
    """
    filtered_df = df[df["Tag"].isin(top_tags)]
    tag_counts_by_year = filtered_df.groupby(["Year", "Tag"]).size().unstack(fill_value=0)
    
    return jsonify(tag_counts_by_year.to_dict(orient="index"))


