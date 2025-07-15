<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class OpenSchemaAnswer extends Model
{
    protected $fillable = ['schema_data', 'description'];
}
