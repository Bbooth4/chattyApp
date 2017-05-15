 <dd>
  <%= form_for @review, :url => product_reviews_path(@product) do |f| %>
    <%= f.label :rating %>:
    <%= f.select :rating, [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]] %>
    <br />

    <%= f.label :description %>:
    <%= f.text_field :description%>
    <br />

    <%= f.submit %>
  <% end %>
</dd>

<%= form_for([@rev, @comment]) do |f| %>